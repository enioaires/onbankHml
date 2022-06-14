import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PageContainer from '../components/PageContainer/PageContainer';
import {
    LimitsTypeTitle,
    OnwershipTypeTitle,
    perioTypeLabel
} from '../Limits.data';
import { SectionTitle } from '../Limits.styles';
import {
    Title,
    TitleContainer,
    ActionButton,
    ActionName
} from './LimitConfig.styles';
import LinearGradientButton from '../../../../../components/LinearGradientButton/LinearGradientButton';
import LimitSlider from './components/LimitSlider/LimitSlider';
import ModalInputValue from '../LimitDetail/components/ModalInputValue/ModalInputValue';
import { useFetch } from '../../../../../utils/useFetch';
import ModalAlert from '../../../../../components/ModalAlert/ModalAlert';

const LimitConfig = ({ route, navigation }: any) => {
    const { params } = route;
    const {
        limitType,
        onwershipType,
        typeTransaction,
        periodType,
        period,
        limits,
        unityLimit
    } = params;
    const [currentLimit, setLimit] = useState(limits.limitTotal);
    const [currentUnityLimit, setUnityLimit] = useState(unityLimit.limitTotal);
    const [inputModalType, setShowInputModalType] = useState('');
    const [showAlertModal, setAlertModal] = useState(false);
    const [isSubmiting, setSubmiting] = useState(false);

    const hasUnityLimit =
        typeTransaction === 'paymentQrCode' ||
        typeTransaction === 'transferPIX';

    const handleToggleInputModal = (type: string) => () => {
        setShowInputModalType(type);
    };

    const { doFetch: defineLimit } = useFetch(
        `/pix/limit/${limitType}`,
        'post',
        {
            // onSuccess: () => {
            //     setAlertModal(true);
            // }
        }
    );

    const handleDefineLimit = () => {
        const postParams = {
            ownership: onwershipType,
            period,
            periodType,
            limit: currentLimit,
            typeTransaction
        };
        if (limitType === 'transfer') {
            const unityLimitPayload = {
                ownership: onwershipType,
                period,
                periodType: 'unity',
                limit: currentUnityLimit,
                typeTransaction
            };
            return Promise.all([
                defineLimit(postParams),
                defineLimit(unityLimitPayload)
            ])
                .then(() => {
                    setAlertModal(true);
                })
                .finally(() => {
                    setSubmiting(false);
                });
        }
        defineLimit(postParams)
            .then(() => {
                setAlertModal(true);
            })
            .finally(() => {
                setSubmiting(false);
            });
    };

    const handleConfirmValue = (amount: number) => {
        if (inputModalType === 'unity') {
            setUnityLimit(amount);
            return setShowInputModalType('');
        }
        setLimit(amount);
        setShowInputModalType('');
    };

    const handleBackToInitial = () => {
        setAlertModal(false);
        navigation.reset({ routes: [{ name: 'Limits' }] });
    };

    return (
        <>
            <PageContainer hiddenBalanceInfo>
                <TitleContainer>
                    <Title>{LimitsTypeTitle[limitType]}</Title>
                </TitleContainer>
                <SectionTitle>{OnwershipTypeTitle[onwershipType]}</SectionTitle>
                <ScrollView>
                    <LimitSlider
                        value={currentLimit}
                        onChange={setLimit}
                        typeTransaction={typeTransaction}
                        maxValue={limits.limitTotal}
                        minValue={0}
                        period={period}
                        periodType={periodType}
                    />
                    {hasUnityLimit && (
                        <LimitSlider
                            value={currentUnityLimit}
                            onChange={setUnityLimit}
                            typeTransaction="unity"
                            maxValue={unityLimit.limitTotal}
                            minValue={0}
                            period={period}
                            periodType={periodType}
                        />
                    )}

                    <ActionButton onPress={handleToggleInputModal(periodType)}>
                        <ActionName>
                            Digitar um valor{' '}
                            {hasUnityLimit &&
                                `(Limite ${perioTypeLabel[
                                    periodType
                                ].toLocaleLowerCase()})`}
                        </ActionName>
                        <FontAwesome5 name="edit" color="#707070" size={20} />
                    </ActionButton>
                    {hasUnityLimit && (
                        <ActionButton onPress={handleToggleInputModal('unity')}>
                            <ActionName>
                                Digitar um valor (Transação unitária)
                            </ActionName>
                            <FontAwesome5
                                name="edit"
                                color="#707070"
                                size={20}
                            />
                        </ActionButton>
                    )}
                    <ActionButton>
                        <ActionName>Solicitar mais limite</ActionName>
                        <FontAwesome5 name="edit" color="#707070" size={20} />
                    </ActionButton>
                    <LinearGradientButton
                        loading={isSubmiting}
                        disabled={isSubmiting}
                        onPress={handleDefineLimit}
                        title="DEFINIR LIMITE"
                    />
                </ScrollView>
            </PageContainer>
            {!!inputModalType && (
                <ModalInputValue
                    onConfirmValue={handleConfirmValue}
                    onClose={handleToggleInputModal('')}
                    maxValue={limits.limitTotal}
                />
            )}
            {showAlertModal && (
                <ModalAlert
                    onClose={handleBackToInitial}
                    buttonText="Voltar a tela inicial"
                    isOpen
                    title="Seu novo limite Pix foi definido com sucesso!"
                    description="Seu novo limite Pix foi definido com sucesso!"
                    buttonAction={handleBackToInitial}
                />
            )}
        </>
    );
};

export default LimitConfig;
