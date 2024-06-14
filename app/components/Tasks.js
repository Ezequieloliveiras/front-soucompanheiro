import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import client from '../api/client'
import { FlatList } from 'react-native-gesture-handler'

const Tasks = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await client.get('/list-users')
        if (res.data.success) {
          setUsers(res.data.user) // Ajuste para acessar o array de usuários corretamente
          console.log(res.data)
        } else {
          console.log('Erro ao buscar usuários:', res.data.message)
        }
      } catch (error) {
        console.log('Erro ao buscar usuários:', error.message)
      }
    }
    // Chama fetchUsers imediatamente
    fetchUsers()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Usuários</Text>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.fullname}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />

     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
})

export default Tasks
