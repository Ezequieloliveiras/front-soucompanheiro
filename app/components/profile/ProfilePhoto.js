import {
    StyleSheet,
    Image
} from 'react-native'
import { useLogin } from '../../context/LoginProvider'

const CustomButton = () => {
    const { profile } = useLogin()
    return (
        <>
            <Image
                style={styles.image}
                source={{
                    uri:
                        profile.avatar ||
                        'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
})

export default CustomButton
