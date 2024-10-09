import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { styles, width } from '../styles'
import MyTextBox from '../components/MyTextBox'
import { useNavigation } from '@react-navigation/native'
import { saveOTP } from '../utils'

export default function MPin({ route }) {
    const [mpin, setMPin] = useState("")
    const navigation = useNavigation()
    const { id } = route.params
    const savemPin = async () => {
        const mpssns = {
            mpin: mpin,
            user_profile: id,
            timestamp: new Date().toISOString()
        }
        await saveOTP(mpssns)
        navigation.navigate('Welcome', { id })
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
                <Text style={{ textAlign: 'justify', marginHorizontal: 18 }}>Enter new MPIN</Text>
                <MyTextBox
                    label="New MPIN"
                    onChangeText={(val) => setMPin(val)}
                    value={mpin}
                    keyboardType="numeric"
                    maxLength={6}
                />
                <Text style={{ textAlign: 'right', marginHorizontal: 6 }}>{mpin.length}/6</Text>
            </View>


            <TouchableOpacity style={styles.roundButton} onPress={savemPin}>
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}