import React, { useEffect, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import * as Sentry from '@sentry/react-native';
import { StatusBar } from 'react-native';
import Orientation from 'react-native-orientation';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import Reactotron from 'reactotron-react-native';
import FlashMessage from 'react-native-flash-message';

// Components
import Navigation from './src/routes';

// Store
import store from './src/store';
import CodePushManager from './src/containers/CodePushManager/CodePushManager';

Sentry.init({
    dsn: 'https://0d91acd0332c45f5b7f4218cd5855443@o304109.ingest.sentry.io/5532609'
});

Pushwoosh.init({
    pw_appid: 'E7C8A-72D8A',
    project_number: '405459472371'
});
Pushwoosh.register();

if (__DEV__) {
    import('./ReactotronConfig').then(() => (console.tron = Reactotron.log));
}
const codePushOptions: CodePushOptions = {
    checkFrequency: CodePush.CheckFrequency.MANUAL
};

function App() {
    const notificationRef = useRef(null);
    const didMount = () => {
        Orientation.unlockAllOrientations();
        Orientation.lockToPortrait();
        // codePush
        //     .getUpdateMetadata()
        //     .then((res) => console.log(res?.appVersion));
    };

    useEffect(didMount, []);

    return (
        <ReduxProvider store={store}>
            <CodePushManager />
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <Navigation />
            <FlashMessage
                position="top"
                ref={notificationRef}
                autoHide
                duration={3000}
            />
        </ReduxProvider>
    );
}

export default CodePush(codePushOptions)(App);
