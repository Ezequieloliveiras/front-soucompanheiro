import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'
import { useLogin } from '../context/LoginProvider'

const CustomButton = ({ title, onPress, backgroundColor, textColor, style, width, height, padding }) => {
    const { setIsLoggedIn, profile, setLoginPending } = useLogin()


    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor }, { width }, { height }, { padding }, style]}
        >
            <View style={{ margin:10}}>
                 <Image
                source={{
                    uri:
                        profile.avatar ||
                        'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            </View>

            <View style={{ height: '100%', marginHorizontal:'auto'}}>
            <Text style={[styles.buttonText, { color: textColor },]} >{title}</Text>
            </View>
           
           
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 16,

    },
})

export default CustomButton
