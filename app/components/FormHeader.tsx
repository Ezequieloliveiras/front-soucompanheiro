import React from 'react';
import { View, StyleSheet, Text, Animated, TextStyle, ViewStyle } from 'react-native';

interface FormHeaderProps {
  leftHeading: string;
  rightHeading: string;
  subHeading: string;
  leftHeaderTranslateX?: number;
  rightHeaderTranslateY?: number;
  rightHeaderOpacity?: number;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateX = 40,
  rightHeaderTranslateY = -20,
  rightHeaderOpacity = 0,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.heading,
            { transform: [{ translateX: leftHeaderTranslateX }] as any },
          ]}
        >
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity: rightHeaderOpacity,
              transform: [{ translateY: rightHeaderTranslateY }] as any,
            },
          ]}
        >
          {rightHeading}
        </Animated.Text>
      </View>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1b1b33',
  } as TextStyle,
  subHeading: {
    fontSize: 18,
    color: '#1b1b33',
    textAlign: 'center',
  } as TextStyle,
});

export default FormHeader;
