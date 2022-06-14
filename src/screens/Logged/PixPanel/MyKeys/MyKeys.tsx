import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Platform,
    StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'src/store/types';
import { useFetch } from '../../../../utils/useFetch';
import CardPixKey from './components/CardPixKey/CardPixKey';
import ModalDetails from './components/ModalDetails/ModalDetails';
import PortabilityRequestModal from './components/PortabilityRequestModal/PortabilityRequestModal';
import PotabilityDonorModal from './components/PotabilityDonorModal/PotabilityDonorModal';
import { KEYS_PENDING_STATUS } from './MyKeys.data';
import {
    SubTitle,
    RegisterKeyContainer,
    RegisterKeyText
} from './MyKeys.styles';
import { Alias, MyKeysReponse } from './MyKeys.types';

const addCircleIcon = require('../../../../../assets/icons/new_icons/add.png');

const portabilityStatus = [
    'AWAITING_RETURN_PSP_DONOR',
    'PENDING_PORTABILITY_DICT',
    'PENDING_PORTABILITY_CONFIRMATION'
];

const MyKeysScreen = () => {
    const [selectedKey, setSelectedKey] = useState<Alias>();
    const [keyRequests, setKeysRequests] = useState<Alias[]>([]);
    const [activeKeys, setActiveKeys] = useState<Alias[]>([]);
    const navigation = useNavigation();

    const isBlockRegisterKeyPix = useSelector(
        (state: IApplicationState) =>
            state.user.data.client.isBlockRegisterKeyPix
    );

    const { doFetch: getKeys, isFetching } = useFetch<MyKeysReponse>(
        '/pix/alias',
        'get',
        {
            onSuccess: (data) => {
                setKeysRequests(
                    data.aliases.filter((key) =>
                        KEYS_PENDING_STATUS.includes(key.status)
                    )
                );
                setActiveKeys(
                    data.aliases.filter((key) => key.status === 'ACTIVE')
                );
            },
            defaultValue: { aliases: [] }
        }
    );

    useEffect(() => {
        getKeys();
    }, []);

    const handleDeleteKey = () => {
        const filteredKeys = activeKeys.filter(
            (key) => key.name !== selectedKey?.name
        );

        const filteredRequestsKey = keyRequests.filter(
            (key) => key.name !== selectedKey?.name
        );
        setKeysRequests(filteredRequestsKey);
        setActiveKeys(filteredKeys);
    };
    const handleSelectKey = (key: Alias) => () => {
        if (key.status === 'PENDING_PORTABILITY_CONFIRMATION') {
            return navigation.navigate('RequestPortability', {
             pixKey: key.type == 'PHONE' ? `+55${key.name}` : key.name
            });
        }
        setSelectedKey(key);
    };

    const handleRegisterKey = () => {
        navigation.navigate('RegisterKey');
    };

    const handleToggleModal = () => setSelectedKey(undefined);
    const handleCancelRequest = () => {
        handleDeleteKey();
        setSelectedKey(undefined);
    };

    if (isFetching) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }
    return (
        <View
            style={{
                flex: 1,
                paddingTop: Platform.select({
                    ios: 140,
                    android: StatusBar.currentHeight
                        ? StatusBar.currentHeight + 80
                        : 80
                }),
                paddingHorizontal: 30,

                paddingBottom: 30
            }}
        >
            {!isBlockRegisterKeyPix && (
                <View style={{ flex: 1 }}>
                    <RegisterKeyContainer>
                        <RegisterKeyText>Registrar chave</RegisterKeyText>
                        <TouchableOpacity
                            onPress={handleRegisterKey}
                            style={{}}
                        >
                            <Image
                                source={addCircleIcon}
                                style={{ width: 26, height: 26 }}
                            />
                        </TouchableOpacity>
                    </RegisterKeyContainer>
                </View>
            )}
            {!selectedKey && activeKeys.length > 0 && (
                <View
                    style={{
                        marginVertical: 10,
                        flex: keyRequests.length > 0 ? 3 : 1
                    }}
                >
                    <SubTitle style={{ marginTop: 14 }}>
                        Suas chaves cadastradas
                    </SubTitle>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => String(item.name)}
                        data={activeKeys}
                        renderItem={({ item }) => (
                            <CardPixKey
                                keyDeatail={item}
                                key={item.name}
                                onPress={handleSelectKey(item)}
                            />
                        )}
                    />
                </View>
            )}
            {!selectedKey && keyRequests.length > 0 && (
                <>
                    {activeKeys.length > 0 && (
                        <View
                            style={{
                                backgroundColor: '#FFFFFF',
                                height: 2,
                                marginVertical: 20
                            }}
                        />
                    )}
                    <View style={{ marginVertical: 10, flex: 3 }}>
                        <SubTitle>Solicitações de chaves</SubTitle>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => String(item.name)}
                            data={keyRequests}
                            renderItem={({ item }) => (
                                <CardPixKey
                                    keyDeatail={item}
                                    key={item.name}
                                    onPress={handleSelectKey(item)}
                                />
                            )}
                        />
                    </View>
                </>
            )}
            {Boolean(selectedKey) && selectedKey?.status === 'ACTIVE' && (
                <ModalDetails
                    onDeleteKey={handleDeleteKey}
                    selectedKey={selectedKey}
                    isOpen={Boolean(selectedKey)}
                    onClose={handleToggleModal}
                />
            )}
            {selectedKey && portabilityStatus.includes(selectedKey.status) && (
                <PortabilityRequestModal
                    selectedKey={selectedKey}
                    isOpen={Boolean(selectedKey)}
                    onClose={handleToggleModal}
                    onCancelRequest={handleCancelRequest}
                />
            )}
            {selectedKey &&
                selectedKey.status ===
                    'USER_CONFIRMATION_PENDING_PORTABILITY' && (
                    <PotabilityDonorModal
                        onConfirm={getKeys}
                        selectedKey={selectedKey}
                        isOpen={Boolean(selectedKey)}
                        onClose={handleToggleModal}
                    />
                )}
        </View>
    );
};

export default MyKeysScreen;
