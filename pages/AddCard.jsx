import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles'
import MyTextBox from '../components/MyTextBox'
import { useNavigation } from '@react-navigation/native'
import { saveCard } from '../utils'

export default function AddCard({ route }) {
    const [limit, setLimit] = useState("")
    const [card, setCard] = useState(0)
    const [name, setName] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const { currentLimit, id } = route.params
    const navigation = useNavigation()

    useEffect(() => {
        setLimit(parseFloat(currentLimit * 3).toFixed(2) < 150000 ? 150000 : parseFloat(currentLimit * 3).toFixed(2))
    }, [currentLimit])

    const formatCardNumber = (num) => {
        return num.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    const handleCardChange = (val) => {
        const formatted = formatCardNumber(val);
        setCard(formatted);
    }

    const handleExpiryChange = (val) => {
        let formatted = val.replace(/\D/g, ''); // Remove any non-digit characters

        if (formatted.length >= 2) {
            formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
        }

        if (formatted.length > 5) {
            formatted = formatted.slice(0, 5); // Ensure the input is no longer than 5 characters (MM/YY)
        }
        setExpiry(formatted);
    }

    const submitCard = async () => {
        const creditCard = {
            card_number: card,
            expiry_date: expiry,
            card_holder: name,
            cvv: cvv,
            user_profile: id
        }
        await saveCard(creditCard)
        navigation.navigate('verifyOTP', { id })
    }

    return (
        <SafeAreaView style={styles.container}>
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
            <Text style={[styles.headerText, { fontSize: 32, marginTop: 20, letterSpacing: 1.1 }]}>Credit Card Details</Text>
            <Text style={[styles.labelStyle, { textAlign: 'center', fontSize: 16, color: 'black', fontWeight: 'normal' }]}>Enter your card details to proceed</Text>
            <Text style={[styles.labelStyle, { textAlign: 'center', fontSize: 18, color: 'green', fontWeight: 'normal' }]}>Approved Limit: ₹{limit} </Text>
            <View>
                <MyTextBox
                    label="Card Number"
                    value={card}
                    maxLength={19}
                    keyboardType="numeric"
                    onChangeText={handleCardChange} />
                <Text style={{ textAlign: 'right', marginHorizontal: 6 }}>{card.length}/19</Text>
                <MyTextBox
                    label="Card Holder Name"
                    text={name}
                    onChangeText={val => setName(val)} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, }}>
                        <MyTextBox
                            label="Expiry Date"
                            value={expiry}
                            onChangeText={handleExpiryChange}
                            keyboardType='numeric'
                            maxLength={5}

                        />
                        <Text style={{ textAlign: 'right', marginHorizontal: 6 }}>{expiry.length}/5</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <MyTextBox
                            label="CVV"
                            onChangeText={val => setCvv(val)}
                            keyboardType='numeric'
                            maxLength={4}
                        />
                        <Text style={{ textAlign: 'right', marginHorizontal: 6 }}>{cvv.length}/4</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }} />
                <TouchableOpacity style={styles.roundButton} onPress={submitCard}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}