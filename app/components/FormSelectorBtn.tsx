import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Animated,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

interface FormSelectorBtnProps {
  title: string;
  backgroundColor: string;
  style?: ViewStyle;
  onPress: (event: GestureResponderEvent) => void;
}

const FormSelectorBtn: React.FC<FormSelectorBtnProps> = ({
  title,
  backgroundColor,
  style,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, style, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '50%',
    backgroundColor: '#1b1b33',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  title: {
    color: 'white',
    fontSize: 16,
  } as TextStyle,
});

export default FormSelectorBtn;
