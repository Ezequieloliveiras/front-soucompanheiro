import { StyleSheet, Text } from 'react-native'
import { useState } from 'react'
import {
  isValidEmail,
  isValidObjField,
  updateError
} from '../../utils/methods'
import { useLogin } from '../../context/LoginProvider'
import signIn from '../../api/user'
import FormContainer from '../registrationForm/FormContainer'
import FormInput from '../registrationForm/FormInput'
import StyledButton from '../buttons/Button'

const LoginForm = () => {
  const { setIsLoggedIn, setProfile, setLoginPending } = useLogin()
  const [userInfo, setUserInfo] = useState({ email: '', password: '', })
  const [error, setError] = useState('')
  const { email, password } = userInfo

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value })
  }

  const isValidForm = () => {
    if (!isValidObjField(userInfo)) {
      updateError('Required all fields!', setError)
      return false
    }

    if (!isValidEmail(email)) {
      updateError('Invalid email!', setError)
      return false
    }

    if (!password.trim() || password.length < 8) {
      updateError('Password is too short!', setError)
      return false
    }

    return true
  }

  const submitForm = async () => {
    setLoginPending(true)
    if (isValidForm()) {
      try {
        const signInRes = await signIn(userInfo.email, userInfo.password)

        if (signInRes && signInRes.data.success) {
          const user = signInRes.data.user
          setUserInfo({ email: '', password: '' })
          setProfile(user)
          setIsLoggedIn(true)
        } else {
          updateError('Falha no login. Verifique suas credenciais.', setError)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoginPending(false)
      }
    } else {
      setLoginPending(false)
    }
  }

  return (
    <FormContainer>
      {error ? (
        <Text style={styles.text}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value) => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='exemplo@email.com'
        autoCapitalize='none'
      />
      <FormInput
        value={password}
        onChangeText={(value) => handleOnChangeText(value, 'password')}
        label='Senha'
        placeholder='********'
        autoCapitalize='none'
        secureTextEntry
      />
      <StyledButton
        backgroundColor={'#0094FF'}
        height={50}
        onPress={submitForm} title='Login' submitting={false} />
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default LoginForm
