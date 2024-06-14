import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importação corrigida
import client from '../api/client';
import { StackActions } from '@react-navigation/native'; // Importação corrigida
import UploadProgress from './UploadProgress';

const ImageUpload = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { token } = route.params;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadProfileImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('profile', {
      uri: image,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    try {
      const res = await client.post('/upload-profile', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `JWT ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setProgress((loaded / total) * 100);
        },
      });

      if (res.data.success) {
        navigation.dispatch(StackActions.replace('AppForm'));
      } else {

      }
    } catch (error) {
      if (error.response) {
        // A resposta foi recebida, mas o servidor respondeu com um status de erro
        console.log('Erro na resposta do servidor:', error.response.data);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.log('Erro na requisição:', error.request);
      } else {
        // Algo aconteceu na configuração da requisição que provocou o erro
        console.log('Erro:', error.message);
      }
      console.log('Configuração do erro:', error.config);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text style={styles.textImage}>Enviar Imagem</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.textSkip}>Pular</Text>

          {image && (
            <TouchableOpacity onPress={uploadProfileImage}>
              <Text style={styles.textNext}>Enviar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {progress > 0 && <UploadProgress process={progress} />}
    </>
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
  },
  textImage: {
    fontSize: 22,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  textSkip: {
    textAlign: 'center',
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.5,
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
});

export default ImageUpload; // Usar export default em vez de module.exports
