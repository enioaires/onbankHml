import React from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

// Styles
import colors from '../../styles/colors';

export interface IActionSheetProps {
    visible: boolean;
    onClose: () => void;
    buttons: Array<{
        label: string;
        icon: any;
        onClick: () => void;
    }>;
}

const ActionSheet: React.FC<IActionSheetProps> = ({
    visible,
    onClose,
    buttons
}: IActionSheetProps) => {
    return (
        <Modal
            style={styles.modal}
            isVisible={visible}
            hasBackdrop
            backdropOpacity={0}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
        >
            <View style={styles.container}>
                {buttons.map((e, idx) => (
                    <>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={e.onClick}
                        >
                            <Image
                                source={e.icon}
                                style={{
                                    width: 21,
                                    height: 21,
                                    marginRight: 23
                                }}
                            />
                            <Text
                                allowFontScaling={false}
                                style={styles.buttonText}
                            >
                                {e.label}
                            </Text>
                        </TouchableOpacity>
                        {buttons.length !== idx + 1 && (
                            <View style={styles.divider} />
                        )}
                    </>
                ))}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        width: '100%',
        justifyContent: 'center'
    },
    buttonText: {
        color: colors.text.second,
        fontSize: 16,
        fontFamily: 'Roboto-Light'
    },
    divider: {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: '#00000029'
    },
    modal: {
        justifyContent: 'flex-end'
    },
    container: {
        borderRadius: 9,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});

export default React.memo(ActionSheet);
