import * as ImagePicker from 'expo-image-picker'
import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useState } from "react"
import { Image } from "react-native"
import client from "@/app/api/client"
import { StackActions } from '@react-navigation/native'

const ImageUpload = (props) => {

    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const { token } = props.route.params

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(result)

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const UploadProfileImage = async (navigation) => {
        const formData = new FormData()
        formData.append('profile', {

            uri: image,
            name: 'profile.jpg',
            type: 'image/jpeg'
        })

        try {
            const res = await client.post('/upload-profile', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${token}`
                },
                onUploadProgress: ({ loaded, total }) => setProgress(loaded / total)
            })

            if (res.data.success) {
                props.navigation.dispatch(
                    StackActions.replace('AppForm')
                )
            }
            console.log(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        < View style={styles.container}>
            <View >
                <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                    {image ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} /> : <Text style={styles.textImage} onPress={UploadProfileImage}>Enviar Imagem</Text>}

                    {image && <Image source={{ uri: image }} style={styles.image} />}

                </TouchableOpacity>
                {progress ? <Text>{progress}</Text> : null}
                <Text style={styles.textSkip}>Pular</Text>
                {image ? (
                    <Text
                        onPress={UploadProfileImage}
                        style={styles.textNext}>
                        Enviar
                    </Text>
                ) : null

                }

            </View>
        </ View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    uploadBtn: {
        height: 200,
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        overflow: 'hidden'
    },
    textImage: {
        fontSize: 22,
        opacity: 0.3,
        fontWeight: 'bold',
        textAlign: ''
    },
    textSkip: {
        textAlign: 'center',
        padding: 15,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        opacity: 0.5
    },
    textNext: {
        textAlign: 'center',
        padding: 15,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        opacity: 0.5,
        borderRadius: 8,
        backgroundColor: 'green',
        color: '#fff',
    },
    button: {
        width: 250,
        height: 60,
        padding: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: '#0094FF',
        color: '#fff'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

})

export default ImageUpload