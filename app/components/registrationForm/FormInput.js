import { View, StyleSheet, Text, TextInput } from 'react-native'

const FormInput = ({ placeholder, label, error, ...props }) => {
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
  },
  label: {
    fontWeight: 'bold',
    color:'#0094FF'
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#0094FF',
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

module.exports = FormInput;
