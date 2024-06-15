import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import client from '../api/client';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await client.get('/list-users');
        if (res.data.success) {
          setUsers(res.data.user);
        } else {
          console.log('Erro ao buscar usuários:', res.data.message);
        }
      } catch (error) {
        console.log('Erro ao buscar usuários:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Usuários</Text>

      <>
        {users.map((user) => (
          <List.Accordion key={user._id} title={user.fullname} id={user._id} style={{width:200}}>
            <List.Item title={user.email} />
          </List.Accordion>
        ))}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
});

export default UsersList;
