import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../types';

interface UserProfileProps {
  user: User;
  onDelete: () => void;
  onEdit: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{`${user?.name?.firstname} ${user?.name?.lastname}`}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.email}>{user.phone}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserProfile;
