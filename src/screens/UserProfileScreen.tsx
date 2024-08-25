import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Button } from 'react-native';
import { fetchUsers, addUser, deleteUser, fetchLimitedUsers, fetchSortedUsers, fetchUserById } from '../utils/api';
import UserProfile from '../components/UserProfile';
import UserDetailModal from '../components/UserDetailModal';
import { User } from '../types'; // Correctly import User type
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

const UserScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('desc');

  useEffect(() => {
    loadUsers();
  }, [sort, limit]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsers(Number(limit),sort);
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser: User = {
        id:Date.now(),
        email:'check@gmail.com',
        username:'check',
        password:'$$$$',
        name:{
            firstname:'check',
            lastname:'done'
        },
        address:{
            city:'kilcoole',
            street:'7835 new road',
            number:3,
            zipcode:'12926-3874',
            geolocation:{
                lat:'-37.3159',
                long:'81.1496'
            }
        },
        phone:'1-570-236-7033'
      };
      const response = await addUser(newUser);
      console.log(response)
      setUsers((prev) => [response,...prev, ]);
      console.log(response,'response')
      Toast.show({ type: 'success', text1: 'User added successfully!' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error adding user' });
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      Toast.show({ type: 'success', text1: 'User deleted successfully!' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error deleting user' });
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleUserUpdated = (user: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? user : u))
    );
  };

  return (
    <View style={styles.container}>
    <Button title="Add User" onPress={handleAddUser} />
    <View style={styles.filters}>
      <Picker
        selectedValue={sort}
        style={styles.picker}
        onValueChange={(itemValue) => setSort(itemValue)}
      >
        <Picker.Item label="Sort by ASC" value="asc" />
        <Picker.Item label="Sort by DESC" value="desc" />
      </Picker>
      <Picker
        selectedValue={limit.toString()}
        style={styles.picker}
        onValueChange={(itemValue) => setLimit(Number(itemValue))}
      >
        <Picker.Item label="5 per page" value="5" />
        <Picker.Item label="10 per page" value="10" />
        <Picker.Item label="50 per page" value="50" />
      </Picker>
    </View>
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <UserProfile
          user={item}
          onDelete={() => handleDeleteUser(item.id)}
          onEdit={() => handleUpdateUser(item)}
        />
      )}
      ListEmptyComponent={<Text>No users found</Text>}
      refreshing={loading}
      onRefresh={() => loadUsers()} 
    />
    {selectedUser && (
      <UserDetailModal
        visible={modalVisible}
        user={selectedUser}
        onClose={() => setModalVisible(false)}
        onUserUpdated={handleUserUpdated}
      />
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    width: '45%',
  },
});

export default UserScreen;
