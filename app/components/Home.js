import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StyledButton from './buttons/Button';
import CardUser from './cards/CardUser';
import { useState } from 'react';

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
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>{text}</Text>
      <CardUser
        title='Colhedor de Café'
        onPress={toggleTextVisibility}
        width={300}
        height={90}
        textColor={'#424242'}
        backgroundColor={'#f5f5f5'}
      />
      
      {isTextVisible && (
        <Text style={{textAlign: 'justify'}}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Text>
      )}
      <View style={{marginBottom: 10, position: 'absolute', bottom: 0}}>
        <StyledButton
          title={buttonText}
          onPress={changeText}
          backgroundColor={'#0094FF'}
          width={150}
          height={50}
        />
      </View>
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
