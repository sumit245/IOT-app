import { registerRootComponent } from 'expo';
import { AppRegistry, NativeModules } from 'react-native';

import App from './App';

const SmsHeadlessTask = async (data) => {
    NativeModules.SmsListenerModule.startListeningToSMS()
}

AppRegistry.registerHeadlessTask('SmsHeadlessTask', () => SmsHeadlessTask);
registerRootComponent(App);
