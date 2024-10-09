import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { PRIMARY_COLOR, styles, TERTIARY_COLOR, width } from '../styles'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card } from 'react-native-paper'

export default function Welcome({ route }) {
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
                <Image source={require('../assets/headerbg.png')} style={styles.headerImage} />
                <Icon name='person-circle' size={36} color="#fff" />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={require('../assets/nisha_sharma.png')} style={styles.cardImage} />
                <Text style={styles.unlockText}>Unlock Card</Text>
                <View style={{ alignItems: 'center', marginTop: 12 }}>
                    <Text>
                        <Text style={{ fontWeight: "bold", letterSpacing: 1 }}>₹0</Text> Annual Fee</Text>
                    <Text>
                        <Text style={{ fontWeight: "bold", letterSpacing: 1 }}>₹50,000</Text> worth of benefits annualy</Text>
                </View>
                <TouchableOpacity style={styles.roundButton} onPress={() => navigation.navigate('checkLimit', { id })}>
                    <Text style={styles.btnText}>Card to Card Apply</Text>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 10,
                    marginHorizontal: 20,
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: TERTIARY_COLOR,
                }}>
                    <View style={{ padding: 4, margin: 4 }}>
                        <MaterialCommunityIcons name='wallet-giftcard' size={30} color="#000" />
                    </View>
                    <View style={{ padding: 4, maxWidth: width - 200, marginHorizontal: 16 }}>
                        <Text style={{ fontWeight: '400', lineHeight: 18 }}>Get 10% off on your next purchase</Text>
                        <Text>Valid till 10th Oct 2024</Text>
                    </View>
                    <View style={{ padding: 4, marginHorizontal: 16 }}>
                        <Icon name='chevron-forward' size={30} color='#000' />
                    </View>
                </View>
                <Text style={{ textAlign: 'center', marginVertical: 20, color: '#787878' }}>Swipe up to see more offers</Text>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: 'https://wallpapers.com/images/hd/refreshing-starbucks-frappuccinos-5hvxubxt9u0ju9yi.jpg' }} ></Card.Cover>
                    <Text style={{ textAlign: 'center', margin: 8 }}>Get upto 20% off on your next purchase</Text>
                </Card>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: 'https://m.media-amazon.com/images/G/31/prime/PPC/CX_revamp/CX_REFRESH_MOBILE-01.1.png' }} ></Card.Cover>
                    <Text style={{ textAlign: 'center', margin: 8 }}>Get amazon gift card worth ₹500</Text>
                </Card>
                <View style={{ padding: 4, margin: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#787878' }}>View all offers </Text>
                    <Icon name='chevron-forward' size={24} color='#000' />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}