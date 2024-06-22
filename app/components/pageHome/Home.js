import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { useState } from 'react'
import StatesAndCityAPI from '../StatesAndCityApi'
import UsersList from '../user/UsersList'
import StyledButton from '../buttons/Button'
const Home = () => {
  const [showFirstComponent, setShowFirstComponent] = useState(true)
  const [text, setText] = useState('Minhas Inscricões')

  const handleClick = () => {
    alterartexto()
    toggleComponent()
  }

  const alterartexto = () => {
    if (text === 'Minhas Inscricões') {
      setText('Vagas disponíveis')
    }
    if (text === 'Vagas disponíveis') {
      setText('Minhas Inscricões')
    }
  }
  const toggleComponent = () => {
    setShowFirstComponent(!showFirstComponent)
  }
  
  return (
    <View style={styles.container}>
      {showFirstComponent ? (
        <UsersList />
      ) : (
        <StatesAndCityAPI />
      )}
      <View style={{
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <StyledButton
          title={text}
          onPress={handleClick}
          height={40}
          width={200}
          backgroundColor={'#0094FF'}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: '6%',
    paddingRight: '5%',

    paddingLeft: '5%',
  },
  text: {
    width: '80%',
    marginTop: 50,
    color: 'grey',
    textAlign: 'center',
  },
})

export default Home
