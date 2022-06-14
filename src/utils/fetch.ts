import { create, ApisauceInstance } from 'apisauce';
import qs from 'qs';

export interface IFetchInstance {
    del: <T = any>(url: string, headers?: {}) => Promise<T | undefined>;
    get: <T = any>(url: string, headers?: {}) => Promise<T | undefined>;
    post: <T = any>(
        url: string,
        data?: any,
        encode?: boolean,
        headers?: {}
    ) => Promise<T | undefined>;
    put: <T = any>(
        url: string,
        data?: any,
        encode?: boolean,
        headers?: {}
    ) => Promise<T | undefined>;
    setBaseURL: (newBaseURL: string) => void;
    setHeader: (key: string, value: string) => void;
    deleteHeader: (key: string) => void;
    addResponseTransform: () => void;
}

function delFactory(request: ApisauceInstance) {
    return async function fn<T = any>(url: string, headers = {}) {
        const response = await request.delete<T>(url, {}, { headers });

        return response.data;
    };
}

function getFactory(request: ApisauceInstance) {
    return async function fn<T = any>(url: string, headers = {}) {
        const response = await request.get<T>(url, {}, { headers });

        return response.data;
    };
}

function postFactory(request: ApisauceInstance) {
    return async function fn<T = any>(
        url: string,
        data?: any,
        encode = false,
        headers = {}
    ) {
        console.log('POST FACTORU', url, data, encode);
        if (encode) {
            data = qs.stringify(data || {}, { encode: true });
            headers = {
                ...headers,
                'content-type': 'application/x-www-form-urlencoded'
            };
        }

        const response = await request.post<T>(url, data || {}, { headers });

        return response.data;
    };
}

function putFactory(request: ApisauceInstance) {
    return async function fn<T = any>(
        url: string,
        data?: any,
        encode = false,
        headers = {}
    ) {
        if (encode) {
            data = qs.stringify(data || {}, { encode: true });
            headers = {
                ...headers,
                'content-type': 'application/x-www-form-urlencoded'
            };
        }

        const response = await request.put<T>(url, data || {}, { headers });

        return response.data;
    };
}

export function fetchFactory(baseURL: string): IFetchInstance {
    const request = create({
        baseURL,
        headers: { 'content-type': 'application/json' },
        timeout: 100000
    });

    const api = {
        del: delFactory(request),
        get: getFactory(request),
        post: postFactory(request),
        put: putFactory(request),
        setBaseURL: (newBaseURL: string) => {
            request.setBaseURL(newBaseURL);
        },
        setHeader: (key: string, value: string) => {
            request.setHeader(key, value);
        },
        deleteHeader: (key: string) => {
            delete request.headers[key];
        },
        addResponseTransform: () => {
            request.addResponseTransform(() => {});
        }
    };

    return api;
}
