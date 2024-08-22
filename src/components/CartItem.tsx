import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '../types'; 

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void; 
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.product?.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item?.product.title}</Text>
        <Text style={styles.price}>${item?.product.price.toFixed(2)}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  quantity: {
    fontSize: 14,
    marginVertical: 5,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CartItem;
