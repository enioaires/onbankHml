import { isDeviceSmallScreen } from '../utils/helpers';

const isSmallScreen = isDeviceSmallScreen();

export const paddings = {
    container: {
        paddingTop: isSmallScreen ? 80 : 80 + 25,
        paddingBottom: 50,
        paddingLeft: 25,
        paddingRight: 25
    },
    container2: {
        paddingTop: 80 + 25,
        paddingBottom: 29,
        paddingLeft: 17,
        paddingRight: 17
    }
};
