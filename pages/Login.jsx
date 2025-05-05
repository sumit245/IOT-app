import { useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, StatusBar, ActivityIndicator } from 'react-native'
import MyTextBox from '../components/MyTextBox'
import { PRIMARY_COLOR, styles } from '../styles'
import { useNavigation } from '@react-navigation/native'
import { createAccount } from '../utils'
import { useDispatch } from 'react-redux'


export default function Login() {
    const [name, setName] = useState("")
    const [dob, setDob] = useState(new Date())
    const [phone, setPhone] = useState("")
    const [errorAadhar, setErrorAadhar] = useState(false)
    const [errorDoB, setErrorDob] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [nameError, setNameError] = useState("")
    const [dobError, setDOBError] = useState("")
    const [phoneError, setPhoneError] = useState("")

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    const dispatch = useDispatch()


    const showDatePicker = () => { setDatePickerVisibility(true); };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate) => {
        hideDatePicker();
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
            const id = await dispatch(createAccount(obj))
            setLoading(false)
            if (id) {
                navigation.navigate('mpinScreen', { id });
            }
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
                    onFocus={showDatePicker}
                    isError={errorDoB}
                    errMsg={dobError}
                />
                <MyTextBox
                    label="Phone Number"
                    onChangeText={val => setPhone(val)}
                    keyboardType='numeric'
                    maxLength={10}
                    value={phone}
                    isError={errorPhone}
                    errMsg={phoneError}
                />
                <Text style={{ textAlign: 'right', marginHorizontal: 6 }}>{phone.length}/10</Text>
            </View>
            <TouchableOpacity style={styles.roundButton} onPress={login} disabled={loading}>
                {
                    loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.btnText}>Login</Text>
                    )
                }
            </TouchableOpacity>
        </SafeAreaView>
    )
}