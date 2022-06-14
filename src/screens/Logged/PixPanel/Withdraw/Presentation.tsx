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
                        title: 'Conheça o PIX Saque! ',
                        description:
                            'Com o Pix Saque você realiza retiradas de dinheiro em espécie, em estabelecimentos comerciais que ofereçam este serviço'
                    },
                    {
                        image: TradePixImage,
                        title: 'PIX Saque',
                        description:
                            'Encontre um estabelecimento credenciado e informe que deseja sacar via Pix Saque. Faça um pix para o estabelecimento, no valor que deseja sacar, sem a necessidade de realizar compras.'
                    },
                    {
                        image: SearchPixImage,
                        title: 'PIX Saque',
                        description:
                            'Selecione a opção “Sacar via PIX” e leia o QRCode apresentado. Confirme o Pix e receba o valor integral da transferência em dinheiro físico.'
                    }
                ]}
                lastButtonTitle="SACAR VIA PIX"
                onStepDone={() => navigation.navigate('ScanQrCode')}
            />
        </PageContainer>
    );
};

export default Withdraw;
