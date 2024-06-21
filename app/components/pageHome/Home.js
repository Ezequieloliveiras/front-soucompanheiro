import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import UsersList from '../user/UsersList';

function Home() {
  const navigation = useNavigation();
  const [text, setText] = useState('Painel de Vagas');
  const [buttonText, setButtonText] = useState('Minhas Incrições');
  const [isTextVisible, setIsTextVisible] = useState(false);

  // Logica de mudar o conteudo da pagina
  const changeText = () => {
    if (text === 'Painel de Vagas') {
      setText('Minhas Incrições');
      setButtonText('Voltar para vagas');
    } else {
      setText('Painel de Vagas');
      setButtonText('Minhas Incrições');
    }
  };

  // Logica de exibir/esconder texto
  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <View style={styles.container}>
      <UsersList />
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
    padding: 20,
  },
  text: {
    width: '80%',
    marginTop: 50,
    color: 'grey',
    textAlign: 'center',
  },
});

export default Home;
