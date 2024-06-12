import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import signIn from '../api/user';

import { useLogin } from '../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';

// Defina a interface SignInResponse antes de usar
interface SignInResponse {
  success: boolean;
  data: {
    token: string;
    user: UserInfo;
  };
}

interface UserInfo {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const { email, password } = userInfo;

  const handleOnChangeText = (value: string, fieldName: keyof UserInfo) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = (): boolean => {
    if (!isValidObjField(userInfo)) {
      updateError('Required all fields!', setError);
      return false;
    }

    if (!isValidEmail(email)) {
      updateError('Invalid email!', setError);
      return false;
    }

    if (!password.trim() || password.length < 8) {
      updateError('Password is too short!', setError);
      return false;
    }

    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const signInRes = await signIn(userInfo.email, userInfo.password);
  
        if (signInRes && signInRes.data.success) {
          const user = signInRes.data.user; // Ajuste para acessar a propriedade correta
          setUserInfo({ email: '', password: '' });
          setProfile(user); // Ajuste para passar o objeto do usuário diretamente
          setIsLoggedIn(true);
        } else {
          updateError('Login failed. Please check your credentials.', setError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value: string) => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='example@email.com'
        autoCapitalize='none'
      />
      <FormInput
        value={password}
        onChangeText={(value: string) => handleOnChangeText(value, 'password')}
        label='Password'
        placeholder='********'
        autoCapitalize='none'
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title='Login' submitting={false} />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
