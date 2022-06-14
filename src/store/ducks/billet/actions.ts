import { PaymentsStackNavigationProps } from '../../../routes/Logged/types';
import { GET_BILLET_DETAILS, STOP_BILLET_DETAILS_REQUEST } from './types';

export type GetBilletDetailsAction = {
    type: typeof GET_BILLET_DETAILS;
    billetNumber: string;
    navigation: PaymentsStackNavigationProps<
        'BarCode' | 'Camera'
    >['navigation'];
};

type StopBilletDetailsRequestAction = {
    type: typeof STOP_BILLET_DETAILS_REQUEST;
};

export type BilletActions =
    | GetBilletDetailsAction
    | StopBilletDetailsRequestAction;

export const getBilletDetailsAction = (
    billetNumber: string,
    navigation: PaymentsStackNavigationProps<'BarCode' | 'Camera'>['navigation']
): GetBilletDetailsAction => ({
    type: 'GET_BILLET_DETAILS',
    billetNumber,
    navigation
});

export const stopBilletDetailsAction = (): StopBilletDetailsRequestAction => ({
    type: 'STOP_BILLET_DETAILS_REQUEST'
});
