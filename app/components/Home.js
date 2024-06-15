import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PeopleGroup from '../../assets/PeopleGroup.svg'
import PeopleAdd from '../../assets/PeopleAdd.svg'

function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Aqui você encontra um companheiro para seu trabalho e também pode ser um companheiro.
      </Text>

      <PeopleGroup width={80} height={80} style={{ marginTop: 30 }} />
      <TouchableOpacity
        style={styles.button}
      onPress={() => navigation.navigate('UserList')}
      >
        <Text style={styles.buttonText}>Procurar um companheiro</Text>
      </TouchableOpacity>

      <PeopleAdd width={80} height={80} style={{ marginTop: 30 }} />
      <TouchableOpacity
        style={styles.button}
      onPress={() => navigation.navigate('StatesAndCityApi')}
      >
        <Text style={styles.buttonText}>Ser um companheiro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 60,
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#0094FF',
    color: '#fff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  text: {
    width: '80%',
    marginTop: 50,
    color: 'grey',
    textAlign: 'center',
  },
});

module.exports = Home;
