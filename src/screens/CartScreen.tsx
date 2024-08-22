import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button, Text } from 'react-native';
import { addCart, deleteCart, fetchCarts, fetchCartsInDateRange, updateCart } from '../utils/api';
import CartItem from '../components/CartItem';
import { Cart } from '../types'; 
import Toast from 'react-native-toast-message';

const CartScreen: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string } | null>(null);
  const [addCartModalVisible, setAddCartModalVisible] = useState<boolean>(false);
  const [updateCartModalVisible, setUpdateCartModalVisible] = useState<boolean>(false);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  
  useEffect(() => {
    const loadCarts = async () => {
      try {
        const response = dateRange
          ? await fetchCartsInDateRange(dateRange.startDate, dateRange.endDate)
          : await fetchCarts();
        setCarts(response);
        Toast.show({ type: 'success', text1: 'Carts fetched successfully!' });
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Error fetching carts' });
        console.error('Error fetching carts:', error);
      }
    };
    loadCarts();
  }, [dateRange]);

  const handleAddCart = async (cart: any) => {
    try {
      await addCart(cart);
      const response = await fetchCarts();
      setCarts(response);
      Toast.show({ type: 'success', text1: 'Cart added successfully!' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error adding cart' });
      console.error('Error adding cart:', error);
    }
  };

  const handleUpdateCart = async (cartId: number, cart: any) => {
    try {
      await updateCart(cartId, cart);
      const response = await fetchCarts();
      setCarts(response);
      Toast.show({ type: 'success', text1: 'Cart updated successfully!' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error updating cart' });
      console.error('Error updating cart:', error);
    }
  };

  const handleDeleteCart = async (cartId: number) => {
    try {
      await deleteCart(cartId);
      const response = await fetchCarts();
      setCarts(response);
      Toast.show({ type: 'success', text1: 'Cart deleted successfully!' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error deleting cart' });
      console.error('Error deleting cart:', error);
    }
  };

  const handleCartPress = (cartId: number) => {
    // Implement navigation to cart details if needed
  };

  return (
    <View style={styles.container}>
      <Button title="Filter by Date Range" onPress={() => {
        // Implement date range selection and filtering
      }} />
      <FlatList
        data={carts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem item={item} onRemove={() => handleCartPress(item.id)} />
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
