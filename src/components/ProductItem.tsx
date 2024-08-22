import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types'; // Adjust import based on your project structure

interface ProductItemProps {
  product: Product;
  onPress: () => void; // Handler for when the item is pressed (e.g., navigate to product details)
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
});

export default ProductItem;
