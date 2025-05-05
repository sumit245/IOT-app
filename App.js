import { useEffect } from "react";
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store/store';
import MyStack from './navigation/StackNavigator';
import { PermissionsAndroid, Alert } from "react-native";

import { requestForegroundPermission, requestSmsPermission } from "./utils";

export default function App() {

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      const fP = await requestForegroundPermission()
      console.log(fp)
      const status = await requestSmsPermission();
      if (status !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          "Permission Required",
          "We need to veriy your mobile number so we want to send and recieve sms.",
          [
            { text: "Retry", onPress: checkAndRequestPermission },
            { text: "Cancel", style: "cancel" },
          ]
        );
      }
    };

    checkAndRequestPermission();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
