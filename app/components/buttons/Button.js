import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const CustomButton = ({
  title,
  onPress,
  backgroundColor,
  style,
  width,
  height,
  padding,
  marginTop
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button,
      { backgroundColor },
      { width },
      { height },
      { padding },
      { marginTop },
        style]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    textColor: '#fff',
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default CustomButton
