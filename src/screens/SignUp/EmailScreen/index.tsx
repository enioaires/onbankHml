import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IdwallSdk from '@idwall/react-native-idwall-sdk';

// Components
import LayoutScreen, { ILayoutScreenProps } from '../LayoutScreen';

// Store
import { IApplicationState } from '../../../store/types';
import { requestSearchEmailAction } from '../../../store/ducks/searchEmail/actions';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';
import { setAlertMessageAction } from '../../../store/ducks/alert/actions';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';
import { ISignUpPayload } from '../../../store/ducks/signUp/types';
import { requestSignUpByLeiturista } from '../../../store/ducks/signUp/saga';

const EmailScreen: React.FC<SignUpStackNavigationProps<'Email'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'Email'>) => {
    const dispatch = useDispatch();
    const { params } = route;
    const value = useSelector(
        (state: IApplicationState) => state.signUp.payload.email
    );
    const validation = useSelector(
        (state: IApplicationState) => state.signUp.inputsValidation.email
    );
    const confirmation = useSelector(
        (state: IApplicationState) => state.signUp.payload.emailConfirmation
    );
    const validationConfirmation = useSelector(
        (state: IApplicationState) =>
            state.signUp.inputsValidation.emailConfirmation
    );
    const loading = useSelector(
        (state: IApplicationState) => state.searchEmail.isLoading
    );
    const generatedToken = useSelector(
        (state: IApplicationState) => state.signUp.payload.tokenSdk
    );

    const signUpPayload: ISignUpPayload = useSelector(
        (state: IApplicationState) => state.signUp.payload
    );
    const signUpByLeiturista = async () => {
        console.log(signUpPayload);
        const [day, month, year] = signUpPayload.birthDate.split('/');

        const requestPayload = {
            fullName: signUpPayload.fullName,
            email: signUpPayload.email,
            phone: signUpPayload.phone.replace(/\D/g, ''),
            documentNumber: signUpPayload.documentNumber.replace(/\D/g, ''),
            birthDate: `${year}-${month}-${day}`,
            motherName: signUpPayload.motherName,
            sex: signUpPayload.sex,
            billingAddressPostalCode: signUpPayload.postalCode.replace(
                /\D/g,
                ''
            ),
            billingAddressStreet: signUpPayload.street,
            billingAddressNumber: signUpPayload.number,
            billingAddressComplement: signUpPayload.complement,
            billingAddressNeighborhood: signUpPayload.neighborhood,
            billingAddressCity: signUpPayload.city,
            billingAddressState: signUpPayload.state
        };
        console.log(requestPayload);

        requestSignUpByLeiturista(requestPayload)
            .then((response) => {
                console.log(response);
                if (!response)
                    throw new Error('Verifique sua conexão de internet.');

                if (response.statusCode === 500) throw new Error('');
                if (response.error) {
                    dispatch(
                        setAlertMessageAction({
                            title: 'Erro',
                            message:
                                response.message ||
                                `Houve um erro ao cadastrar o usuário`,
                            action: {
                                onPress: () => {
                                    navigation.goBack();
                                },
                                mainLabel: 'Ok'
                            },
                            type: 'info'
                        })
                    );
                    return;
                }
                if (response) {
                    dispatch(
                        setAlertMessageAction({
                            title: 'Sucesso',
                            message: `Usuário cadastrado com sucesso`,
                            action: {
                                onPress: () => {
                                    navigation.navigate('Home');
                                },
                                mainLabel: 'Ok'
                            },
                            type: 'info'
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(
                    setAlertMessageAction({
                        title: 'Erro',
                        message: `Houve um erro ao cadastrar o usuário`,
                        action: {
                            onPress: () => {
                                navigation.goBack();
                            },
                            mainLabel: 'Ok'
                        },
                        type: 'error'
                    })
                );
            });
    };

    const initiateKYCFlow = () => {
        IdwallSdk.initialize('3cb30ce77c16f00436ed732539942778');
        IdwallSdk.setupPublicKeys([
            'AHYMQP+2/KIo32qYcfqnmSn+N/K3IdSZWlqa2Zan9eY=',
            'tDilFQ4366PMdAmN/kyNiBQy24YHjuDs6Qsa6Oc/4c8='
        ]);

        IdwallSdk.startCompleteFlow('CHOOSE')
            .then((token: any) => {
                // console.log(`Do your thing with this token: ${token}`);
                dispatch(
                    changeSignUpPayloadAction({
                        key: 'accountId',
                        value: ''
                    })
                );
                dispatch(
                    changeSignUpPayloadAction({
                        key: 'tokenSdk',
                        value: token
                    })
                );
                navigation.push('SignUp', {
                    screen: 'Password'
                });
            })
            .catch((error: any) => {
                if (!error.message.match(/[canceled|cancelled] by user/g)) {
                    dispatch(
                        setAlertMessageAction({
                            title: 'Oops',
                            message:
                                'Algo inesperado ocorreu...Tente novamente',
                            type: 'error'
                        })
                    );
                }
            });
    };

    const formTitleCpf = params?.routeContext
        ? 'Endereço de e-mail'
        : 'Qual o seu e-mail?';
    const EMAIL_PROPS: ILayoutScreenProps = {
        key: 'email',
        title: {
            cpf: formTitleCpf,
            cnpj: 'Qual o e-mail do representante?'
        },
        nextScreen: {
            cpf: 'Password'
        },
        stepNumber: {
            cpf: 8,
            cnpj: 10
        },
        placeHolder: '',
        hasConfirmation: 'Confirme o e-mail',
        loading,

        isButtonDisabled: () => {
            if (
                value.length <= 0 ||
                validation.length > 0 ||
                confirmation.trim() !== value.trim() ||
                validationConfirmation.length > 0
            )
                return true;
            return false;
        },
        onNext: async () => {
            if (params?.routeContext) {
                signUpByLeiturista();
                return;
            }
            // todas as contas vao ser criadas como demo
            return navigation.navigate('SignUp', {
                screen: 'CapacityFinancial'
            });
            // initiateKYCFlow();
            // Desabilitado, todas as contas serao criadas como DEMO
            // dispatch(
            //     setAlertMessageAction({
            //         title: 'Validação',
            //         message: 'Agora precisamos validar seus documentos.',
            //         type: 'info',
            //         action: {
            //             mainLabel: 'Validar',
            //             onPress: () => {
            //                 if (generatedToken) {
            //                     dispatch(
            //                         setAlertMessageAction({
            //                             title: 'Atenção!',
            //                             message:
            //                                 'Você já tirou a selfie e a foto do seu documento. Deseja refazer o processo?',
            //                             type: 'info',
            //                             action: {
            //                                 mainLabel: 'Sim',
            //                                 onPress: () => {
            //                                     dispatch(
            //                                         requestSearchEmailAction(
            //                                             value,
            //                                             navigation,
            //                                             initiateKYCFlow,
            //                                             'completed'
            //                                         )
            //                                     );
            //                                 },
            //                                 secondLabel: 'Não',
            //                                 secondOnPress: () => {
            //                                     navigation.navigate('SignUp', {
            //                                         screen: 'Password'
            //                                     });
            //                                 }
            //                             }
            //                         })
            //                     );
            //                 } else {
            //                     dispatch(
            //                         requestSearchEmailAction(
            //                             value,
            //                             navigation,
            //                             initiateKYCFlow,
            //                             'completed'
            //                         )
            //                     );
            //                 }
            //             }
            //             /* secondLabel: 'Conta demonstrativa',
            //             secondOnPress: () => {
            //                 dispatch(
            //                     changeSignUpPayloadAction({
            //                         key: 'tokenSdk',
            //                         value: ''
            //                     })
            //                 );
            //                 dispatch(
            //                     requestSearchEmailAction(
            //                         value,
            //                         navigation,
            //                         initiateKYCFlow,
            //                         'demo'
            //                     )
            //                 );
            //             } */
            //         }
            //     })
            // );
        }
    };

    return <LayoutScreen navigation={navigation} screenProps={EMAIL_PROPS} />;
};

export default EmailScreen;
