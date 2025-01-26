import { Dimensions, StyleSheet, Platform, StatusBar } from "react-native";

export const { width, height } = Dimensions.get('window')
export const PRIMARY_COLOR = "#006CB7"
export const SECONDARY_COLOR = "#000000"
export const TERTIARY_COLOR = "#006CB744"
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 1,
        width: width - 2,
    },
    headerContainer: {
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        width: width,
        marginLeft: -1
    },
    headerImage: {
        height: 60,
        width: 112,
    },
    inputContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 8,
        height: 60,
        textAlignVertical: "center",
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        padding: 8,
        paddingHorizontal: 12,
        fontSize: 18,
        borderRadius: 6,
        marginVertical: 10
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 12
    },
    unlockText: {
        fontSize: 36,
        textAlign: 'center',
        marginTop: 12
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 4,
        textAlign: 'center'
    },
    labelStyle: {
        fontSize: 16,
        color: '#858585',
        fontWeight: '500',
    },
    labelTextEntry: {
        marginLeft: 10,
    },
    roundButton: {
        alignSelf: 'center',
        backgroundColor: PRIMARY_COLOR,
        height: 54,
        borderRadius: 30,
        width: width / 1.75,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12
    },
    btnText: {
        fontSize: 22,
        fontWeight: '600',
        color: "#fff"
    },
    cardImage: {
        height: (width - 10) * 0.5625,
        width: width,
        resizeMode: 'contain',
        marginTop: 20
    },
    card: {
        height: width * 0.625,
        width: width - 40,
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 2,
        padding: 2
    }
})