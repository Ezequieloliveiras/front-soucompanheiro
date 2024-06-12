import React from 'react';
import { View, StyleSheet, Text, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';

interface FormInputProps extends TextInputProps {
  placeholder: string;
  label: string;
  error?: string | null;
}

const FormInput: React.FC<FormInputProps> = ({ placeholder, label, error, ...props }) => {
  return (
    <>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>{label}</Text>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  } as ViewStyle,
  label: {
    fontWeight: 'bold',
  } as TextStyle,
  errorText: {
    color: 'red',
    fontSize: 16,
  } as TextStyle,
  input: {
    borderWidth: 1,
    borderColor: '#1b1b33',
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  } as TextStyle,
});

export default FormInput;
