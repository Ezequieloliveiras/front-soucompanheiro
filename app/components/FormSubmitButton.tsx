import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native';

interface FormSubmitButtonProps {
  title: string;
  submitting: boolean;
  onPress: () => void;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? 'rgba(27,27,51,0.4)'
    : 'rgba(27,27,51,1)';

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : undefined}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  text: {
    fontSize: 18,
    color: '#fff',
  } as TextStyle,
});

export default FormSubmitButton;
