import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Button, Text} from 'react-native';
import {fetchCarts, updateCart} from '../utils/api';
import CartItem from '../components/CartItem';
import {Cart, Product} from '../types';
import Toast from 'react-native-toast-message';

const CartScreen: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);

  useEffect(() => {
    const loadCarts = async () => {
      try {
        const response = await fetchCarts();
        setCarts(response);
      } catch (error) {
        Toast.show({type: 'error', text1: 'Error fetching carts'});
        console.error('Error fetching carts:', error);
      }
    };
    loadCarts();
  }, []);

  const handleRemoveProduct = async (cartId: number, productId: number) => {
    try {
      const updatedCart = carts.find(cart => cart.id === cartId);
      if (updatedCart) {
        updatedCart.products = updatedCart.products.filter(
          product => product.productId !== productId,
        );
        await updateCart(cartId, updatedCart);
      }

      const response = await fetchCarts();
      setCarts(response);
      Toast.show({type: 'success', text1: 'Product removed successfully!'});
    } catch (error) {
      Toast.show({type: 'error', text1: 'Error removing product'});
      console.error('Error removing product:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            {item.products.map(cart => (
              <CartItem
                key={cart.productId}
                product={cart as Product}
                quantity={cart.quantity}
                onRemove={() => handleRemoveProduct(item.id, cart.productId)}
              />
            ))}
          </View>
        )}
        ListEmptyComponent={<Text>No carts found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default CartScreen;
