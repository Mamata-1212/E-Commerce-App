import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Product} from '../types';
import Button from './Button';
interface ProductItemProps {
  product: Product;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onPress,
  onDelete,
  onEdit,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginVertical: 30,
    backgroundColor: 'white',
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default ProductItem;
