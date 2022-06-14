import React, { ReactElement } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet } from 'react-native';

// Styles
import colors from '../../styles/colors';

export interface IModalCompProps {
    visible: boolean;
    children: ReactElement;
}

const ModalComp: React.FC<IModalCompProps> = ({
    visible,
    children
}: IModalCompProps) => {
    return (
        <Modal
            isVisible={visible}
            hasBackdrop
            backdropColor="#000"
            backdropOpacity={0.4}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
        >
            <View style={styles.container}>{children}</View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 11,
        backgroundColor: colors.white,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10
    }
});

export default React.memo(ModalComp);
