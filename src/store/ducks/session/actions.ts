import { EXPIRE_SESSION, CANCEL_SESSION_EXPIRATION } from './types';

type ExpireSessionAction = {
    type: typeof EXPIRE_SESSION;
};

type CancelSessionExpirationAction = {
    type: typeof CANCEL_SESSION_EXPIRATION;
};

export type SessionActions =
    | ExpireSessionAction
    | CancelSessionExpirationAction;

export const expireSessionAction = (): ExpireSessionAction => ({
    type: 'EXPIRE_SESSION'
});

export const cancelSessionExpirationAction = (): CancelSessionExpirationAction => ({
    type: 'CANCEL_SESSION_EXPIRATION'
});
