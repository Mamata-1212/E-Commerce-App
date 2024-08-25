import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types';
import Button from './Button';

interface CartItemProps {
  product: Product;
  quantity: number;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity, onRemove }) => {
  // if (!product || !product.price || !product.title || !product.image) {
  //   return null; 
  // }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
        <Button title='Remove' onPress={onRemove}/>
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
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
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
