import AsyncStorage from "@react-native-async-storage/async-storage"
import client from "./client"

const signIn = async (email, password) => {
    try {
        const signInRes = await client.post('/sign-in', {
            email,
            password,
        })
        if (signInRes.data.success) {
            const token = signInRes.data.token
            await AsyncStorage.setItem('token', token)
        }
        return signInRes
    } catch (error) {
        console.log('erro dentro do método de login.', error.message)
    }
}
export const signOut = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (token !== null) {
            const res = await client.get('/sign-out', {
                headers: {
                    Authorization: `JWT ${token}`
                }
            })
            if (res.data.success) {
                await AsyncStorage.removeItem('token')
                return true
            }
        }
        return false
    } catch (error) {
        console.log('erro dentro do método de saída.', error.message)
        return false
    }
}

export default signIn