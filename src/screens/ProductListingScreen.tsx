import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Button, Text} from 'react-native';
import {Product} from '../types';
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from '../utils/api';
import ProductItem from '../components/ProductItem';
import FilterModal from '../components/FilterModal';
import {showError} from '../utils/helper';

const ProductsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [sort, setSort] = useState<string>('');
  const [limit, setLimit] = useState<string>('10');

  const fetchProductData = async () => {
    try {
      const response = selectedCategory
        ? await fetchProductsByCategory(selectedCategory)
        : await fetchProducts(Number(limit),sort);
      setProducts(response);
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [selectedCategory, sort, limit]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        showError(error);
      }
    };
    loadCategories();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sortOption: string) => {
    setSort(sortOption);
  };

  const handleLimitChange = (limitOption: string) => {
    setLimit(limitOption);
  };

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetails', {productId});
  };

  const renderItem = ({item}: {item: Product}) => (
    <ProductItem product={item} onPress={() => handleProductPress(item.id)} />
  );

  return (
    <View style={styles.container}>
      <Button title="Filter" onPress={() => setFilterModalVisible(true)} />
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No products found</Text>}
      />
      <FilterModal
        visible={isFilterModalVisible}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        onLimitChange={handleLimitChange}
        onSortChange={handleSortChange}
        onClose={() => setFilterModalVisible(false)}
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

export default ProductsScreen;
