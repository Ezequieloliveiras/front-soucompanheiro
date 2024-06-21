import {
  StyleSheet,
  View
} from 'react-native'

import UsersList from '../user/UsersList'

function Home() {
  return (
    <View style={styles.container}>
      <UsersList />
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default Home
