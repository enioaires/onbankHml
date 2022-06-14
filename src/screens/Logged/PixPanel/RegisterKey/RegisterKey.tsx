import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, Platform, StatusBar, View } from 'react-native';
import ModalConfirmCode from '../../../../components/ModalConfirmCode/ModalConfirmCode';
import ModalAlert from '../../../../components/ModalAlert/ModalAlert';
import { useFetch } from '../../../../utils/useFetch';
import KeySelectCard from './components/KeySelectCard/KeySelectCard';
import LinearGradientButton from '../../../../components/LinearGradientButton/LinearGradientButton';

import {
    Container,
    TitleContainer,
    Title,
    Description,
    KnowMore,
    KnowMoreButton
} from './RegisterKey.styles';

import { SelectedKey } from './RegisterKey.types';
import { confirmModalTitle } from './RegisterKey.data';
import ImportantInfoModal from './components/ImportantInfoModal/ImportantInfoModal';
import { onGetUserData } from '../../../../store/ducks/userData/actions';

const formateKeyTypeSubmit: { [key: string]: string } = {
    phoneNumber: 'PHONE',
    email: 'EMAIL',
    documentNumber: 'TAX_ID',
    evp: 'EVP'
};

const RegisterKeyScreen = ({ navigation, route }: any) => {
    const [selectedKey, setSelectedKey] = useState<SelectedKey>();
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [timeToResendCode, setTimeToResendCode] = useState(1);
    const [toggleImportantInfoModal, setShowImportantInfoModal] =
        useState(false);

    const { params } = route;

    const dispatch = useDispatch();
    const { data: preSaveKeys, doFetch: getKeys } = useFetch(
        'pix/pre-save/keys',
        'get',
        {
            defaultValue: {}
        }
    );

    const { doFetch: registerKey, isFetching: loadingSubmitKey } = useFetch(
        '/pix/alias/registration',
        'post',
        {
            onSuccess: (response) => {
                if (response.status === 'IDENTITY_VALIDATION_PENDING') {
                    return setShowConfirmModal(true);
                }

                if (response.status === 'PENDING_PORTABILITY_CONFIRMATION') {
                    return navigation.reset({
                        index: 1,
                        routes: [
                            { name: 'Panel' },
                            { name: 'MyKeys' },
                            {
                                name: 'RequestPortability',
                                params: {
                                    pixKey:
                                        selectedKey?.type == 'PHONE'
                                            ? '+55' + selectedKey?.key
                                            : selectedKey?.key
                                }
                            }
                        ]
                    });
                }
                if (response.status) {
                    setSelectedKey(undefined);
                    setShowAlert(true);
                    dispatch(onGetUserData());
                }
            }
        }
    );

    const { doFetch: verificationPixKey, isFetching: loadingVerification } =
        useFetch('pix/alias/verification', 'post', {
            onSuccess: () => {
                setShowAlert(true);
                setShowConfirmModal(false);
                handleButtonAction();
            },
            onError: () => {
                // setShowConfirmModal(false);
            }
        });

    const handleConfirmCode = (code: string) => {
        verificationPixKey({ verificationCode: code, alias: selectedKey?.key });
    };

    const resendVerificationCode = () => {
        registerKey(selectedKey);

        setTimeToResendCode((oldState) => oldState + 1);
    };

    const handleSelectKey = (key: any) => () => {
        const formattedKey = {
            key: preSaveKeys[key].key?.toLowerCase(),
            type: formateKeyTypeSubmit[key]
        };
        setSelectedKey(formattedKey);
    };
    const handleToggleModal = () => setShowAlert(!showAlert);

    const handleClickRegisterKey = () => setShowImportantInfoModal(true);
    const onSubmitKey = () => {
        handleToggleImportantInfoModal();
        registerKey(selectedKey);
    };

    const handleCloseConfirmCode = () => setShowConfirmModal(false);

    const handleRegisterLater = () => {
        navigation.reset({
            routes: [{ name: 'General' }, { name: 'PixPanel' }]
        });
    };
    const handleButtonAction = () => {
        navigation.reset({
            routes: [{ name: 'General' }, { name: 'PixPanel' }]
        });
    };
    const handleToggleImportantInfoModal = () =>
        setShowImportantInfoModal(!toggleImportantInfoModal);

    useEffect(() => {
        getKeys();
    }, []);

    return (
        <Container
            style={{
                flex: 1,
                paddingLeft: 27,
                paddingRight: 23,
                paddingTop: Platform.select({
                    ios: 140,
                    android: StatusBar.currentHeight
                        ? StatusBar.currentHeight + 80
                        : 130
                }),
                paddingBottom: 50
            }}
        >
            <View style={{ flex: 1 }}>
                <TitleContainer>
                    <Title>ChavePix</Title>
                </TitleContainer>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        paddingBottom: 20,
                        borderColor: '#dbdbdb'
                    }}
                >
                    <Description>
                        Ao cadastrar sua chave, você está ciente e concorda que
                        ao receber uma transação, a pessoa que fez a operação
                        terá acesso parcial ao seu dado compartilhado na chave.
                    </Description>
                </View>
                <FlatList
                    contentContainerStyle={{ marginTop: 30 }}
                    data={Object.keys(preSaveKeys)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <KeySelectCard
                            isSelected={
                                selectedKey?.type === formateKeyTypeSubmit[item]
                            }
                            onSelect={handleSelectKey(item)}
                            key={item}
                            keyType={item}
                            keyValue={preSaveKeys[item].key}
                        />
                    )}
                />
            </View>
            <View>
                <LinearGradientButton
                    loading={loadingSubmitKey}
                    disabled={!selectedKey}
                    onPress={handleClickRegisterKey}
                    title="CADASTRAR CHAVE"
                />
                {params?.fromHome && (
                    <KnowMoreButton onPress={handleRegisterLater}>
                        <KnowMore>CADASTRAR DEPOIS</KnowMore>
                    </KnowMoreButton>
                )}
            </View>
            <ModalAlert
                isOpen={showAlert}
                onClose={handleToggleModal}
                title="Sua nova chave foi cadastrada com sucesso!"
                description="Em até 24h sua chave já estará disponível para transações no app OnBank"
                buttonText="Voltar a tela inicial"
                buttonAction={handleButtonAction}
            />
            <ModalConfirmCode
                title={
                    (selectedKey?.type &&
                        confirmModalTitle[selectedKey?.type]) ||
                    'Digite o código'
                }
                timeToResendCode={timeToResendCode}
                onClickResendCode={resendVerificationCode}
                isOpen={showConfirmModal}
                onClose={handleCloseConfirmCode}
                onPressConfirm={handleConfirmCode}
                loading={loadingVerification || loadingSubmitKey}
            />
            <ImportantInfoModal
                onAgree={onSubmitKey}
                isOpen={toggleImportantInfoModal}
                onClose={handleToggleImportantInfoModal}
            />
        </Container>
    );
};

export default RegisterKeyScreen;
