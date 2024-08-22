import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchProducts } from '../utils/api';
import SearchBar from '../components/SearchBar';
import Select from '../components/Select';
import Button from '../components/Button';
import { filterProducts, setProducts } from '../redux/slices/productSlice';
import { Picker } from '@react-native-picker/picker';

const ProductListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredItems } = useSelector((state: RootState) => state.products);
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      dispatch(setProducts(response.data));
    };
    getProducts();
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts({ category, minPrice, maxPrice }));
  }, [category, minPrice, maxPrice, dispatch]);

  return (
    <View style={styles.container}>
      <SearchBar placeholder="Search products..." />
      <Select
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue.toString())}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Electronics" value="Electronics" />
        <Picker.Item label="Jewelery" value="Jewelery" />
        <Picker.Item label="Men's Clothing" value="Men's Clothing" />
        <Picker.Item label="Women's Clothing" value="Women's Clothing" />
      </Select>
      {/* <Button onPress={() => setMinPrice(0) && setMaxPrice(1000)} title="Reset Filters" /> */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  product: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ProductListScreen;
