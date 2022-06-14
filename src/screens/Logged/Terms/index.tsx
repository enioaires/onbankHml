import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

// Navigation Type
import { GeneralStackNavigationProps } from '../../../routes/Logged/types';

// Components
import ActionButton from '../../../components/ActionButton';

// Store
import { acceptNewTermsAction } from '../../../store/ducks/terms/actions';
import { IApplicationState } from '../../../store/types';

const Terms: React.FC<GeneralStackNavigationProps<'Terms'>> = ({
    navigation
}: GeneralStackNavigationProps<'Terms'>) => {
    const dispatch = useDispatch();

    const loading = useSelector(
        (state: IApplicationState) => state.terms.isLoading
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 1, paddingTop: 100 }}>
                <WebView
                    style={{ flex: 1 }}
                    source={{
                        uri: `https://onbank-api-v2-master.s3-sa-east-1.amazonaws.com/Termos/index.html`
                    }}
                    startInLoadingState
                />
                <View
                    style={{
                        alignSelf: 'stretch',
                        paddingHorizontal: 20
                    }}
                >
                    <ActionButton
                        label="Aceitar termos"
                        isLoading={loading}
                        onPress={() =>
                            dispatch(acceptNewTermsAction(navigation))
                        }
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Terms;
