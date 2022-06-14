export interface PixKeyOption {
    name: string;
    type: string;
    icon: any;
    size?: any;
}
export interface PixKeyOptionProps {
    option: PixKeyOption;
    onPressOption: (option: PixKeyOption) => void;
}
