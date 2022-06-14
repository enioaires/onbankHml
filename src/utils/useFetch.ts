import { useState } from 'react';
import api from '../api';
import to from './awaitTo';

interface Config<FetchData> {
    defaultValue?: any;
    onSuccess?: (response: FetchData) => void;
    onError?: (error: Error | null) => void;
    fetchConfig?: any;
    hideAlertOnError?: boolean;
}

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const useFetch = <FetchData = any>(
    path: string,
    method = 'get',
    config: Config<FetchData> = {}
) => {
    const { defaultValue, onSuccess, onError, fetchConfig } = config;
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState<FetchData>(defaultValue);

    const doFetch = async (
        params: any = undefined,
        newPath = path
    ): Promise<FetchData | boolean> => {
        setIsFetching(true);
        const apiCall =
            method === 'post' || method === 'put'
                ? api[method](newPath, params, false)
                : api[method](newPath, params, fetchConfig || {});
        const [error, response] = await to<{ data: FetchData }>(
            apiCall,
            undefined,
            config.hideAlertOnError
        );
        setIsFetching(false);
        if (response) {
            if (onSuccess) {
                onSuccess(response.data);
            }

            setData(response.data);
            return response.data;
        }

        if (error) {
            if (onError) {
                onError(error || null);
            }

            // handleApiError(error);
            return false;
        }

        return true;
    };

    const updateData = (modifiedData: FetchData) => setData(modifiedData);

    return { isFetching, doFetch, data, updateData };
};
