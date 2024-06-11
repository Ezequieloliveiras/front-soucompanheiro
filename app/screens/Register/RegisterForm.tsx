import axios from 'axios'
import * as yup from 'yup'
import React, { useState } from 'react'
import { Formik } from 'formik'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  GestureResponderEvent
} from 'react-native'

interface FormValues { // Define uma interface FormValues para os valores do formulário.
  fullname: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const initialValues: FormValues = { // Define initialValues com valores vazios para inicializar o formulário.
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'), // Valida que email é um string de e-mail válido e obrigatório.
  password: yup.string().required('Campo obrigatório'),// Valida que password e confirmPassword são strings obrigatórias.
  confirmPassword: yup.string().required('Campo obrigatório'),
})

import client from '@/app/api/client'

const RegisterForm = () => {
  const [password, setPassword] = useState('')
  const handleChangePassword = (text: string) => setPassword(text)

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await client.post('/create-user', values)
      if (res.data.success) {
        Alert.alert('Successo', res.data.message)
      } else {
        Alert.alert('Error', res.data.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Erro de resposta do servidor
          Alert.alert('Error', error.response.data.message)
        } else if (error.request) {
          // A solicitação foi feita, mas nenhuma resposta foi recebida
          Alert.alert('Error', 'Erro ao enviar formulário. Por favor, tente novamente mais tarde.')
        }
      }
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira seu nome"
              onChangeText={handleChange('fullname')}
              onBlur={handleBlur('fullname')}
              value={values.fullname}
              keyboardType="default"
              autoCapitalize="none"
            />
            {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira seu email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite uma senha"
              onChangeText={(text) => {
                handleChange('password')(text)
                handleChangePassword(text)
              }}
              onBlur={handleBlur('password')}
              value={password}
              secureTextEntry
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Text style={styles.label}>Confirme a Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme a Senha"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

            <Button title="Enviar" onPress={(event: GestureResponderEvent) => handleSubmit()} />
          </View>
        )}
      </Formik>
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
  error: {
    color: 'red',
    marginBottom: 8,
  },
})

export default RegisterForm
