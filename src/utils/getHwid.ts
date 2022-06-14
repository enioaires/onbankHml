/* eslint-disable import/prefer-default-export */
import Pushwoosh from 'pushwoosh-react-native-plugin';

export const getHwid = (): Promise<string> => {
    return new Promise((resolve, _) => {
        Pushwoosh.getHwid(resolve);
    });
};
