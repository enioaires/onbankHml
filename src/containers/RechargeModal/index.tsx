import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useDispatch } from 'react-redux';

// Styles
import colors from '../../styles/colors';

// Components
import Modal from '../../components/Modal';

// Store
import {
    clearRechargeStateAction,
    changeRechargePhoneNumberAction,
    addRechargeContactAction,
    changeRechargeOperatorAction,
    requestRechargeValuesAction
} from '../../store/ducks/recharge/actions';

// Utils
import { prefityNames, maskPhoneNumber } from '../../utils/prettiers';

interface IProps {
    visible: boolean;
    setVisible(value: boolean): void;
    clientInfo: any;
    navigation: any;
}

export default function RechargeModal({
    visible,
    setVisible,
    clientInfo,
    navigation
}: IProps) {
    const dispatch = useDispatch();

    const renderBank = ({ item, index }: any) => {
        const onItemClick = () => {
            dispatch(clearRechargeStateAction());
            dispatch(changeRechargePhoneNumberAction(item.phoneNumber));
            dispatch(addRechargeContactAction(clientInfo.name));
            dispatch(
                changeRechargeOperatorAction({
                    carrierName: item.carrierName,
                    carrierId: item.carrierId
                })
            );
            dispatch(requestRechargeValuesAction(navigation));
            setVisible(false);
        };

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                key={index}
                onPress={onItemClick}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.bank,
                                {
                                    fontSize: 14,
                                    marginBottom: 4,
                                    color: colors.blue.second
                                }
                            ]}
                        >
                            {item.carrierName || ''}
                        </Text>
                        <Text allowFontScaling={false} style={styles.bank}>
                            {maskPhoneNumber(item.phoneNumber)}
                        </Text>
                    </View>
                </View>
                <Image
                    source={require('../../../assets/icons/forward.png')}
                    style={styles.forwardIcon}
                />
            </TouchableOpacity>
        );
    };

    const addAnotherNumber = () => {
        dispatch(clearRechargeStateAction());
        setVisible(false);
        dispatch(addRechargeContactAction(clientInfo.name));

        setTimeout(
            () => navigation.push('Recharge', { screen: 'Number' }),
            400
        );
    };

    return (
        <Modal visible={visible}>
            <>
                <View style={styles.top}>
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        style={{
                            position: 'absolute',
                            top: 22,
                            left: 24
                        }}
                    >
                        <Image
                            source={require('../../../assets/icons/close.png')}
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.name}>
                        {visible && prefityNames(clientInfo.name)}
                    </Text>
                </View>
                {visible && (
                    <FlatList
                        style={{
                            maxHeight: 160
                        }}
                        data={clientInfo.phones}
                        renderItem={renderBank}
                        keyExtractor={(_, index) => index.toString()}
                    />
                )}
                <TouchableOpacity
                    style={styles.bottom}
                    onPress={addAnotherNumber}
                >
                    <Image
                        source={require('../../../assets/icons/add.png')}
                        style={styles.addIcon}
                    />
                    <Text allowFontScaling={false} style={styles.add}>
                        Adicionar novo número
                    </Text>
                </TouchableOpacity>
            </>
        </Modal>
    );
}

const styles = StyleSheet.create({
    top: {
        position: 'relative',
        borderBottomWidth: 0.7,
        borderBottomColor: colors.gray.third,
        alignItems: 'center'
    },
    closeIcon: {
        width: 16,
        height: 16
    },
    name: {
        fontSize: 17,
        fontFamily: 'Roboto-Bold',
        color: colors.blue.second,
        marginTop: 49,
        marginBottom: 25
    },
    itemContainer: {
        borderBottomWidth: 0.7,
        borderBottomColor: colors.gray.third,
        flexDirection: 'row',
        paddingLeft: 24,
        paddingRight: 38,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80
    },
    logo: {
        width: 31,
        height: 31,
        marginRight: 25
    },
    bank: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: colors.text.second,
        opacity: 0.8
    },
    account: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        opacity: 0.8,
        marginTop: 4
    },
    forwardIcon: {
        width: 6,
        height: 12
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addIcon: {
        width: 20,
        height: 20,
        marginRight: 19
    },
    add: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: colors.text.second,
        opacity: 0.8,
        marginVertical: 26
    }
});
