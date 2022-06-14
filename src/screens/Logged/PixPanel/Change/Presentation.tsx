import React from 'react';

import { useNavigation } from '@react-navigation/native';
import Carousel from '../../../../components/Carousel/Carousel';
import PageContainer from './Components/PageContainer/PageContainer';
import WithdrawImage from '../../../../../assets/withdraw.png';
import TradePixImage from '../../../../../assets/TradePix.png';
import SearchPixImage from '../../../../../assets/SearchPix.png';
// import { Container } from './styles';

const Withdraw: React.FC = () => {
    const navigation = useNavigation();
    return (
        <PageContainer hiddenBalanceInfo>
            <Carousel
                contents={[
                    {
                        image: WithdrawImage,
                        title: 'Conheça o PIX Troco! ',
                        description:
                            'Com o Pix Troco você realiza compras com Pix e recebe o troco em dinheiro, em estabelecimentos que ofereçam o serviço.'
                    },
                    {
                        image: TradePixImage,
                        title: 'PIX Troco',
                        description:
                            'Encontre um estabelecimento credenciado e informe que deseja receber via PIX Troco. Realize uma compra com o pagamento superior ao valor da mercadoria ou serviço e receba o valor excedente, em dinheiro.'
                    },
                    {
                        image: SearchPixImage,
                        title: 'PIX Troco',
                        description:
                            'Selecione a opção “Troco via PIX” e leia o QRCode apresentado. Confirme o Pix e receba de volta a diferença entre o preço do produto e a quantia transferida.'
                    }
                ]}
                lastButtonTitle="TROCO VIA PIX"
                onStepDone={() => navigation.navigate('ScanQrCode')}
            />
        </PageContainer>
    );
};

export default Withdraw;
