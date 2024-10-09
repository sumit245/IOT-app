import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles, width } from '../styles'
import { useNavigation } from '@react-navigation/native'

export default function ThankYou({ route }) {
    const navigation = useNavigation()
    const { id } = route.params
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/headerbg.png')}
                    height={72}
                    style={styles.headerImage}
                    width={112} />
            </View>

            <View style={{ marginTop: width / 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.headerText}>Thank you!🎉</Text>
                <Text style={{ marginVertical: 20, textAlign: 'center' }}>Your form of application for new Amex card has been successfully submitted.</Text>
                <Text>We will get back to you in 24-48 hours</Text>
            </View>
            <TouchableOpacity style={styles.roundButton} onPress={() => navigation.navigate('Welcome', { id })}>
                <Text style={styles.btnText}>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}