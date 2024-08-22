import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { User } from '../types';
import { updateUser } from '../utils/api';
import Toast from 'react-native-toast-message';

interface UserDetailModalProps {
  visible: boolean;
  user: User | null;
  onClose: () => void;
  onUserUpdated: (user: User) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ visible, user, onClose, onUserUpdated }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setFirstname(user?.name?.firstname);
      setLastname(user?.name.lastname);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (user) {
      try {
        const updatedUser = { ...user, firstname, lastname, email };
        const response = await updateUser(user.id, updatedUser);
        onUserUpdated(response);
        Toast.show({ type: 'success', text1: 'User updated successfully!' });
        onClose();
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error updating user' });
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit User</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastname}
            onChangeText={setLastname}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserDetailModal;
