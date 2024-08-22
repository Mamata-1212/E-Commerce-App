import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const CheckoutScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleCheckout = () => {
    // Handle checkout
    Alert.alert('Checkout Successful', `Thank you ${name}, your order will be shipped to ${address}.`);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput placeholder="Payment Method" value={paymentMethod} onChangeText={setPaymentMethod} />
      <Button onPress={handleCheckout} title="Place Order" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});

export default CheckoutScreen;
