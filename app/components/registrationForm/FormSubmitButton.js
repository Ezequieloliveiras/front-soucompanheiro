import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

const FormSubmitButton = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? '#0094FF'
    : '#0094FF'

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : undefined}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
})

module.exports = FormSubmitButton
