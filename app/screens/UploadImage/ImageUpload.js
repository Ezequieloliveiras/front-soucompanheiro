import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

const ImageUpload = () => {

    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };


    return (
        < View style={styles.container}>
            <View >
                <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                    <Text style={styles.textImage}>Enviar Imagem</Text>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </TouchableOpacity>
                <Text style={styles.textSkip}>Pular</Text>

                { image ? (
                    <Text style={styles.textNext}>Enviar</Text>


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
        borderWidth: 1
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
        fontWeight:'bold',
        textTransform:'uppercase',
        letterSpacing: 2,
        opacity: 0.5
    },
    textNext: {
        textAlign: 'center',
        padding: 15,
        fontSize: 16,
        fontWeight:'bold',
        textTransform:'uppercase',
        letterSpacing: 2,
        opacity: 0.5,
        borderRadius: 8,
        backgroundColor: 'green',
        color: '#fff',
    }

})

export default ImageUpload