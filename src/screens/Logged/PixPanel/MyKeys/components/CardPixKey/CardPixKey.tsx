import React from 'react';
import { View, Image, Text } from 'react-native';
import { formatKey } from '../../MyKeys.data';
import {
    Container,
    KeyType,
    StyledContainer,
    Value
} from './CardPixKey.styles';
import { CardPixKeyProps } from './CardPixKey.types';

const idCardF = require('../../../../../../../assets/icons/id-card-f.png');
const mdMore = require('../../../../../../../assets/icons/md-more.png');
const idIcon = require('../../../../../../../assets/icons/new_icons/cpf.png');
const numberIcon = require('../../../../../../../assets/icons/new_icons/cellphone.png');
const emailIcon = require('../../../../../../../assets/icons/new_icons/email.png');
const ramdomIcon = require('../../../../../../../assets/icons/new_icons/ramdom-key.png');

const keyLabel: { [key: string]: string } = {
    PHONE: 'Celular',
    EMAIL: 'E-mail',
    EVP: 'Chave aleatoria',
    TAX_ID: 'CPF/CNPJ'
};

const keyIcon: { [key: string]: any } = {
    PHONE: numberIcon,
    EMAIL: emailIcon,
    EVP: ramdomIcon,
    TAX_ID: idIcon
}
interface PotabilityLabelProps {
    [key: string]: { label: string; status: string; color: string };
}

const potabilityLabel: PotabilityLabelProps = {
    USER_CONFIRMATION_PENDING_PORTABILITY: {
        label: 'Doação pendente',
        status: 'Aguardando doação',
        color: '#A2A2A2'
    },
    PENDING_PORTABILITY_CONFIRMATION: {
        label: 'Solicitação pendente',
        status: 'Aguardando solicitação',
        color: '#D3A403'
    },
    AWAITING_RETURN_PSP_DONOR: {
        label: 'Portabilidade enviada',
        status: 'Aguardando confirmação',
        color: '#A2A2A2'
    },
    PENDING_PORTABILITY_DICT: {
        label: 'Portabilidade enviada',
        status: 'Aguardando confirmação',
        color: '#A2A2A2'
    }
};

const PORTABILITY_STATUS = [
    'PENDING_PORTABILITY_CONFIRMATION',
    'AWAITING_RETURN_PSP_DONOR',
    'PENDING_PORTABILITY_DICT',
    'USER_CONFIRMATION_PENDING_PORTABILITY'
];

const CardPixKey = (props: CardPixKeyProps) => {
    const { onPress, keyDeatail, isReadOnly } = props;

    const RenderContainer = ({
        children
    }: {
        children: React.ReactElement | React.ReactNode;
    }) => {
        return !isReadOnly ? (
            <Container onPress={onPress}>{children}</Container>
        ) : (
            <StyledContainer>{children}</StyledContainer>
        );
    };
    const isPortability = PORTABILITY_STATUS.includes(keyDeatail.status);
    return (
        <RenderContainer>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={keyIcon[keyDeatail.type]}
                    style={{ width: 24, height: 24 }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <KeyType>
                        {isPortability
                            ? formatKey(keyDeatail.name, keyDeatail.type)
                            : keyLabel[keyDeatail.type] || keyDeatail.type}
                    </KeyType>
                    {!isPortability && (
                        <Value>
                            {formatKey(keyDeatail.name, keyDeatail.type)}
                        </Value>
                    )}
                </View>
                {!isReadOnly && (
                    <View>
                        <Image source={mdMore} />
                    </View>
                )}
            </View>
            {isPortability && (
                <View
                    style={{
                        borderTopWidth: 1,
                        borderColor: '#FFFFFF',
                        paddingTop: 8,
                        marginTop: 8,
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: '#707070', fontSize: 10 }}>
                            Chave - {keyLabel[keyDeatail.type]}
                        </Text>
                        <View
                            style={{
                                backgroundColor:
                                    potabilityLabel[keyDeatail.status].color,
                                borderRadius: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                maxWidth: 140,
                                marginTop: 3
                            }}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: 11 }}>
                                {potabilityLabel[keyDeatail.status].label}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: '#707070',
                                textAlign: 'right',
                                fontSize: 11
                            }}
                        >
                            Status
                        </Text>
                        <Text
                            style={{
                                color: '#3199B3',
                                textAlign: 'right',
                                fontSize: 10,
                                marginTop: 3,
                                fontFamily: 'Roboto-Bold'
                            }}
                        >
                            {potabilityLabel[keyDeatail.status].status}
                        </Text>
                    </View>
                </View>
            )}
        </RenderContainer>
    );
};

export default CardPixKey;
