import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from '../../utils/methods';
import FormContainer from '../../components/FormContainer';
import FormInput from '../../components/FormInput';
import FormSubmitButton from '../../components/FormSubmitButton';

interface UserInfo {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState<UserInfo>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

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
      setSubmitting(true);
      try {
        const res = await client.post('/sign-in', { ...userInfo });

        if (res.data.success) {
          setUserInfo({ email: '', password: '' });
          setProfile(res.data.user);
          setIsLoggedIn(true);
        }

        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
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
      <FormSubmitButton onPress={submitForm} title='Login' submitting={submitting} />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
