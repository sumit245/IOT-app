import { TextInput, View, Text } from 'react-native'
import { styles, PRIMARY_COLOR, SECONDARY_COLOR } from '../styles'

export default function MyTextBox({ label, onChangeText, isError, errMsg, ...props }) {
    return (
        <View>
            <TextInput
                style={[styles.inputContainer, { borderColor: isError ? 'red' : PRIMARY_COLOR }]}
                onChangeText={onChangeText}
                placeholderTextColor={SECONDARY_COLOR}
                placeholder={label}
                color={SECONDARY_COLOR}
                cursorColor={PRIMARY_COLOR}
                {...props}
            />
            {
                isError &&
                <Text style={{ marginLeft: 18, color: 'red' }}>{errMsg}</Text>
            }
        </View>
    )
}