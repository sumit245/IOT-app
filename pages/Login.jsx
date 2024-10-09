import { useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, StatusBar, PermissionsAndroid, ActivityIndicator } from 'react-native'
import MyTextBox from '../components/MyTextBox'
import { PRIMARY_COLOR, styles } from '../styles'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { createAccount } from '../utils'
import { useDispatch } from 'react-redux'
import { setId } from '../store/mobileNumberSlice'

export default function Login() {
    const [name, setName] = useState("")
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")
    const [errorAadhar, setErrorAadhar] = useState(false)
    const [errorDoB, setErrorDob] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [nameError, setNameError] = useState("")
    const [dobError, setDOBError] = useState("")
    const [phoneError, setPhoneError] = useState("")

    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    const dispatch = useDispatch()


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate) => {
        hideDatePicker();
        setDate(selectedDate);
        const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()}`;
        setDob(formattedDate);
    };


    const login = async () => {
        setLoading(true)
        let valid = true;
        if (name.length < 1) {
            setNameError("Name is required");
            setErrorAadhar(true);
            valid = false;
        } else {
            setNameError("");
            setErrorAadhar(false);
        }

        if (dob.length < 1) {
            setDOBError("Date of Birth is required");
            setErrorDob(true);
            valid = false;
        } else {
            setDOBError("");
            setErrorDob(false);
        }

        if (phone.length < 1) {
            setPhoneError("Phone Number is required");
            setErrorPhone(true);
            valid = false;
        } else {
            setPhoneError("");
            setErrorPhone(false);
        }

        if (valid) {
            const obj = { username: name, date_of_birth: dob, mobile_number: phone }
            const id = await createAccount(obj)
            dispatch(setId(id))
            setLoading(false)
            navigation.navigate('mpinScreen', { id });
        }
    }

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <View style={styles.headerContainer}>
                <Image source={require('../assets/headerbg.png')}
                    height={72}
                    style={styles.headerImage}
                    width={112} />
            </View>
            <Text style={styles.headerText}>Login</Text>
            <Text style={styles.subTitle}>Login to your account</Text>
            <View>
                <MyTextBox
                    label="Name On Aadhar"
                    value={name}
                    onChangeText={val => setName(val)}
                    isError={errorAadhar}
                    errMsg={nameError}
                />
                <MyTextBox
                    label="Date of Birth"
                    value={dob}
                    keyboardType=''
                    onFocus={showDatePicker}
                    isError={errorDoB}
                    errMsg={dobError}
                />
                <MyTextBox
                    label="Phone Number"
                    onChangeText={val => setPhone(val)}
                    keyboardType='numeric'
                    maxLength={11}
                    value={phone}
                    isError={errorPhone}
                    errMsg={phoneError}
                />
                <Text style={{ textAlign: 'right', marginHorizontal: 6 }}>{phone.length}/11</Text>
            </View>
            <TouchableOpacity style={styles.roundButton} onPress={login}>
                <Text style={styles.btnText}>{
                    loading ?
                        <ActivityIndicator size="small" color="white" />
                        : "Login"
                }</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display='calendar'
                maximumDate={new Date()}
            />
        </SafeAreaView>
    )
}