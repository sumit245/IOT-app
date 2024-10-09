import { View, Text, Image, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { PRIMARY_COLOR, styles, width } from '../styles'
import { useNavigation } from '@react-navigation/native'

export default function CheckLimit({ route }) {
    const [currentLimit, setLimit] = useState("")
    const navigation = useNavigation()
    const { id } = route.params
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <View style={[styles.headerContainer,
            {
                flexDirection: 'row',
                justifyContent: 'space-between'
            }]}>
                <View />
                <Image source={require('../assets/headerbg.png')}
                    height={60}
                    style={styles.headerImage}
                    width={112} />
                <View />
            </View>
            <ScrollView>
                <Image source={require('../assets/nisha_sharma.png')} style={styles.cardImage} />

                <View style={{ borderRadius: 12, backgroundColor: '#c8c8c8', margin: 24, padding: 12, width: width - 48 }}>
                    <Text style={{ padding: 10, fontSize: 22 }}>Congratulations!</Text>
                    <Text style={{ padding: 10, fontSize: 16, maxWidth: '80%' }}>Here is your life time free American Express credit card offer</Text>
                    <Text style={{ padding: 10, fontSize: 20, maxWidth: '80%', lineHeight: 22 }}>Assured Credit Limit{"\n"}
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>₹1,50,000</Text>
                    </Text>

                    <Text style={{ padding: 10, fontSize: 16, }}>zero annual charges, 50,000+ worth of bonus</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                        <TextInput
                            placeholder='Enter Current Limit'
                            underlineColorAndroid={'#efefef'}
                            keyboardType='numeric'
                            cursorColor='black'
                            onChangeText={(val) => setLimit(val)}
                            style={{ padding: 8 }} />
                        <TouchableOpacity style={[styles.roundButton, { width: width / 2.5, height: 48 }]} onPress={() => navigation.navigate('AddCard', { currentLimit, id })}>
                            <Text style={[styles.btnText, { fontSize: 18 }]}>Get Credit Limit</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ padding: 10, fontSize: 20, maxWidth: '80%', lineHeight: 22 }}>No Hidden Charges</Text>
                    <Text style={{ padding: 10, fontSize: 16, lineHeight: 22 }}>
                        Get a renewal fee waiver on eligible spends of
                        ₹20,000 and above in the previous year of
                        card membership.
                        {"\n\n"}
                        Convert purchases into EMI at the point of sale
                        with an interest rate as low as 14% per annum
                        and flexible repayment options
                        ranging from 3 to 24 months.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}