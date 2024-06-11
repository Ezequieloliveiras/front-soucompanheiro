import axios from 'axios'
import * as yup from 'yup'
import React from 'react'
import { Formik } from 'formik'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  GestureResponderEvent,
} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import client from '@/app/api/client'
import { StackTypes } from '@/app/' // Verifique o caminho para StackTypes


interface FormValues {
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

const initialValues: FormValues = {
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const validationSchema = yup.object().shape({
  fullname: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'As senhas devem corresponder')
    .required('Campo obrigatório'),
})

const RegisterForm: React.FC = () => {
  const navigation = useNavigation<StackTypes>()

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await client.post('/create-user', values)
      if (res.data.success) {
        const signInRes = await client.post('/sign-in', {email: values.email, password: values.password })

        if(signInRes.data.success) {
          navigation.dispatch(
            StackActions.replace('Upload', {
              token: signInRes.data.token,
            })
          )

        }
        Alert.alert('Sucesso', res.data.message)
      } else {
        Alert.alert('Erro', res.data.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Erro de resposta do servidor
          Alert.alert('Erro', error.response.data.message)
        } else if (error.request) {
          // Nenhuma resposta recebida
          Alert.alert('Erro', 'Erro ao enviar formulário. Por favor, tente novamente mais tarde.')
        }
      } else {
        console.error(error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
            {errors.fullname && touched.fullname && (
              <Text style={styles.error}>{errors.fullname}</Text>
            )}

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
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite uma senha"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Text style={styles.label}>Confirme a Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme a Senha"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <Button
              title="Enviar"
              onPress={handleSubmit as unknown as (event: GestureResponderEvent) => void}
            />
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
