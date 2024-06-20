import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const CustomButton = ({ title, onPress, backgroundColor, textColor, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, style]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
   
    
  },
  buttonText: {
    fontSize: 16,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
})

export default CustomButton
