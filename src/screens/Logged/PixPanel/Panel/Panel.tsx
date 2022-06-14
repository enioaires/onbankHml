import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, StatusBar, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import { IApplicationState } from '../../../../store/types';
import MyQrCode from './components/MyQrCode/MyQrCode';
import QuickFunctions from './components/QuickFunctions/QuickFunctions';
import { operations } from './Panel.data';
import {
    Container,
    OperationsContainer,
    Operation,
    OperationName,
    Title
} from './Panel.styles';
import { Opeartion } from './Panel.types';

const { width } = Dimensions.get('screen');

const PixPanelScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isBlockRegisterKeyPix = useSelector(
        (state: IApplicationState) =>
            state.user.data.client.isBlockRegisterKeyPix
    );
    const clientData = useSelector(
        (state: IApplicationState) => state.user.data.client
    );
    const hasPixKeyActive = useSelector(
        (state: IApplicationState) => state.user.data.client.hasPixKeyActive
    );

    const handlePressOperation = (operation: Opeartion) => () => {
        const { screen } = operation;
        if (screen === 'Receive') {
            if (!isBlockRegisterKeyPix && !hasPixKeyActive) {
                return navigation.navigate('RegisterKey');
            }
            if (isBlockRegisterKeyPix && !hasPixKeyActive) {
                return dispatch(
                    setAlertMessageAction({
                        title: 'Oops',
                        message:
                            'Operação indisponível, entre em contato com o suporte',
                        type: 'error'
                    })
                );
            }
        }
        navigation.navigate(screen);
    };

    return (
        <Container
            style={{
                paddingLeft: 27,
                paddingRight: 23,
                paddingTop: Platform.select({
                    ios: 140,
                    android: StatusBar.currentHeight
                        ? StatusBar.currentHeight + 80
                        : 130
                })
            }}
        >
            <MyQrCode />
            <Title>Transações</Title>
            <OperationsContainer>
                {operations.map((operation, index) => (
                    <Operation
                        onPress={handlePressOperation(operation)}
                        key={operation.name}
                        style={{
                            width: [0, 1].includes(index)
                                ? width * 0.41
                                : width * 0.27
                        }}
                    >
                        <Image
                            source={operation.icon}
                            style={operation.size ? operation.size : {}}
                        />
                        <OperationName>{operation.name}</OperationName>
                    </Operation>
                ))}
            </OperationsContainer>

            <QuickFunctions />
        </Container>
    );
};

export default PixPanelScreen;
