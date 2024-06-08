import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { StackTypes } from "@/app"
import Client from '../../api/client'

import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'



const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        // Aqui você pode adicionar lógica para enviar o formulário
        try {
            const response = await Client.post('http://192.168.0.4:8002/sign-in', {

                email: email,
                password: password

            })

            if (response.data.success) {
                setEmail(''),
                    setPassword('')
            }

            console.log(response.data)

        } catch (error) {
            Alert.alert('Error', 'Falha no login. Por favor, tente novamente.')
            console.error(error)
        }

    }

    const navigation = useNavigation<StackTypes>() // colocar o stacktypes da tipagem

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleSubmit} />

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate("RegisterForm")}>
                <Text style={styles.text}>Registre-se</Text>
            </TouchableOpacity>


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    touchableOpacity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default LoginForm
