import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import { useLogin } from '../context/LoginProvider';
import signIn from '../api/user';

const SignupForm = () => {
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const { setLoginPending } = useLogin();

  const isValidForm = (userInfo, setError) => {
    if (!isValidObjField(userInfo)) {
      updateError('Required all fields!', setError);
      return false;
    }
    if (!userInfo.fullname.trim() || userInfo.fullname.length < 3) {
      updateError('Invalid name!', setError);
      return false;
    }
    if (!isValidEmail(userInfo.email)) {
      updateError('Invalid email!', setError);
      return false;
    }
    if (!userInfo.password.trim() || userInfo.password.length < 8) {
      updateError('Password is too short!', setError);
      return false;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      updateError('Password does not match!', setError);
      return false;
    }
    return true;
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .trim()
      .min(3, 'Invalid name!')
      .required('Name is required!'),
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string()
      .trim()
      .min(8, 'Password is too short!')
      .required('Password is required!'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password does not match!'
    ),
  });

  const signUp = async (values, formikActions) => {
    setLoginPending(true);
    try {
      const res = await client.post('/create-user', {
        ...values,
      });

      if (res.data.success) {
        const signInRes = await signIn(values.email, values.password);
        if (signInRes && signInRes.data && signInRes.data.success) {
          navigation.dispatch(
            StackActions.replace('ImageUpload', {
              token: signInRes.data.token,
            })
          );
        }
      }
    } catch (error) {
      updateError('Failed to sign up. Please try again later.', setError);
    } finally {
      formikActions.resetForm();
      formikActions.setSubmitting(false);
      setLoginPending(false);
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          if (isValidForm(values, setError)) {
            signUp(values, formikActions);
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
        }) => (
          <>
            <FormInput
              value={values.fullname}
              error={touched.fullname && errors.fullname ? errors.fullname : null}
              onChangeText={handleChange('fullname')}
              onBlur={handleBlur('fullname')}
              label='Full Name'
              placeholder='John Smith'
            />
            <FormInput
              value={values.email}
              error={touched.email && errors.email ? errors.email : null}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize='none'
              label='Email'
              placeholder='example@email.com'
            />
            <FormInput
              value={values.password}
              error={touched.password && errors.password ? errors.password : null}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              autoCapitalize='none'
              secureTextEntry
              label='Password'
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
              label='Confirm Password'
              placeholder='********'
            />
            <FormSubmitButton
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
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
