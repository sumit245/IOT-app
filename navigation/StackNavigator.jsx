import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import AddCard from '../pages/AddCard';
import ThankYou from '../pages/ThankYou';
import CheckLimit from '../pages/CheckLimit';
import MPin from '../pages/MPin';
import OTPVerification from '../pages/OTPVerification'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MyStack() {
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
    )
}