import React from 'react';
import { Dimensions } from 'react-native';
import LinearGradientButton from '../../../../../../components/LinearGradientButton/LinearGradientButton';
import ModalBottom from '../../../../../../components/ModalBottom/ModalBottom';
import {
    Title,
    ModalBody,
    Description,
    Paragraph,
    ModalFooter
} from './ImportantInfoModal.styles';
import { ImportantInfoModalProps } from './ImportantInfoModal.types';

const { height } = Dimensions.get('screen');
const ImportantInfoModal = (props: ImportantInfoModalProps) => {
    const { onClose, isOpen, onAgree } = props;
    return (
        <ModalBottom
            isOpen={isOpen}
            onClose={onClose}
            bodyHeight={height * 0.5}
        >
            <ModalBody>
                <Title>Importante!</Title>
                <Description>
                    <Paragraph>
                        Ao cadastrar sua chave, você está ciente e concorda que
                        ao receber uma transação, a pessoa que fez a operação
                        terá acesso aos seguintes dados relacionados a sua
                        chave: Nome completo, CPF (os três primeiros e os
                        últimos dígitos).
                    </Paragraph>
                    <Paragraph>
                        - Quando a transação PIX for iniciada por QR Code,
                        aparecerá o nome do prestador de serviços de pagamento
                        ao qual a chave está vinculada,
                    </Paragraph>
                </Description>
            </ModalBody>
            <ModalFooter>
                <LinearGradientButton onPress={onAgree} title="CONCORDO" />
            </ModalFooter>
        </ModalBottom>
    );
};

export default ImportantInfoModal;
