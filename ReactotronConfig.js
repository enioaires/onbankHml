import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';

import AsyncStorage from '@react-native-community/async-storage';

export const reactotronConfig = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({ host: 'localhost' }) // controls connection & communication settings
    .useReactNative()
    .use(sagaPlugin())
    .use(reactotronRedux()) // add all built-in react native plugins
    .connect(); // let's connect!
