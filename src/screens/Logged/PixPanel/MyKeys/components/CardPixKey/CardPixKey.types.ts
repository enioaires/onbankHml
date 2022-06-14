import { Alias } from '../../MyKeys.types';

export interface CardPixKeyProps {
    onPress: () => void;
    keyDeatail: Alias;
    isReadOnly?: boolean;
}
