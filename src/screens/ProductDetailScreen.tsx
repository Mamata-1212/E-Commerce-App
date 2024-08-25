import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {addCart, fetchProductById} from '../utils/api';
import Button from '../components/Button';
import {showError, showSuccess} from '../utils/helper';

const ProductDetailsScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {productId} = route.params;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(productId);
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    loadProduct();
  }, [productId]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const handleAddToCart = async () => {
    if (!product) return;

    const cartItem = {
      userId: 5,
      date: Date.now(),
      products: [{productId: product.id, quantity: 1}],
    };

    try {
      await addCart(cartItem);
      showSuccess('Product added to cart successfully!');
    } catch (error) {
      showError('Error adding product to cart');
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'green',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default ProductDetailsScreen;
