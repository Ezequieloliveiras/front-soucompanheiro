import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { useLogin } from '../../context/LoginProvider'
import {
  isValidEmail,
  isValidObjField,
  updateError
} from '../../utils/methods'

import * as Yup from 'yup'
import client from '../../api/client'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormSubmitButton from './FormSubmitButton'
import signIn from '../../api/user'

const SignupForm = () => {
  const navigation = useNavigation()
  const [error, setError] = useState('')
  const { setLoginPending } = useLogin()

  const isValidForm = (userInfo, setError) => {
    if (!isValidObjField(userInfo)) {
      updateError('Todos os campos obrigatórios!', setError)
      return false
    }
    if (!userInfo.fullname.trim() || userInfo.fullname.length < 3) {
      updateError('Nome inválido!', setError)
      return false
    }
    if (!isValidEmail(userInfo.email)) {
      updateError('Email! inválido', setError)
      return false
    }
    if (!userInfo.password.trim() || userInfo.password.length < 8) {
      updateError('A senha é muito curta!', setError)
      return false
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      updateError('A senha não corresponde!', setError)
      return false
    }
    return true
  }

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .trim()
      .min(3, 'Nome inválido!')
      .required('O nome é obrigatório!'),
    email: Yup.string().email('e-mail inválido!').required('O e-mail é obrigatório!'),
    password: Yup.string()
      .trim()
      .min(8, 'A senha é muito curta!')
      .required('Senha requerida!'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Senha não corresponde!'
    ),
    option: Yup.string().required('A opção é obrigatório!')
  })

  const signUp = async (values, formikActions) => {
    setLoginPending(true)
    try {
      console.log('Values being sent:', values); // Log the values
      const res = await client.post('/create-user', {
        ...values,
      })

      if (res.data.success) {
        const signInRes = await signIn(values.email, values.password)
        if (signInRes && signInRes.data && signInRes.data.success) {
          navigation.dispatch(
            StackActions.replace('ImageUpload', {
              token: signInRes.data.token,
            })
          )
        }
      }
    } catch (error) {
      updateError('Falha ao se inscrever. Por favor, tente novamente mais tarde.', setError)
    } finally {
      formikActions.resetForm()
      formikActions.setSubmitting(false)
      setLoginPending(false)
    }
  }

  return (
    <FormContainer>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          password: '',
          confirmPassword: '',
          option: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          if (isValidForm(values, setError)) {
            signUp(values, formikActions)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => (
          <>
            <FormInput
              value={values.fullname}
              error={touched.fullname && errors.fullname ? errors.fullname : null}
              onChangeText={handleChange('fullname')}
              onBlur={handleBlur('fullname')}
              label='Seu Nome'
              placeholder='João Silva'
            />
            <FormInput
              value={values.email}
              error={touched.email && errors.email ? errors.email : null}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize='none'
              label='Email'
              placeholder='exemplo@email.com'
            />
            <FormInput
              value={values.password}
              error={touched.password && errors.password ? errors.password : null}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              autoCapitalize='none'
              secureTextEntry
              label='Senha'
              placeholder='********'
            />
            <FormInput
              value={values.confirmPassword}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : null
              }
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              autoCapitalize='none'
              secureTextEntry
              label='Confirme a senha'
              placeholder='********'
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.option}
                onValueChange={(itemValue) => setFieldValue('option', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione o que procura" value="" style={{ color: '#757575' }}/>
                <Picker.Item label="Preciso de um trabalho" value="PrecisoDeTrabalho" />
                <Picker.Item label="Preciso de um companheiro" value="PrecisoDeCompanheiro" />
              </Picker>
              {touched.option && errors.option && (
                <Text style={styles.errorText}>{errors.option}</Text>
              )}
            </View>
            <FormSubmitButton
              style={styles.button}
              submitting={isSubmitting}
              onPress={handleSubmit}
              title='Sign up'
            />
          </>
        )}
      </Formik>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 50,
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: '#e0e0e0',

    borderRadius: 5,
  },
  picker: {
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  }
})

export default SignupForm
