import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, clearCart } from '../redux/slices/cartSlice';
import Button from '../components/Button';

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleCheckout = () => {
    // Handle guest checkout
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Button onPress={() => dispatch(removeFromCart(item.id))} title="Remove" />
          </View>
        )}
      />
      <Button onPress={() => dispatch(clearCart())} title="Clear Cart" />
      <Button onPress={handleCheckout} title="Checkout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
});

export default CartScreen;
