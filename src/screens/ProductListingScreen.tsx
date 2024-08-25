import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Product} from '../types';
import {
  addProduct,
  deleteProduct,
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  updateProduct,
} from '../utils/api';
import ProductItem from '../components/ProductItem';
import FilterModal from '../components/FilterModal';
import {showError, showSuccess} from '../utils/helper';
import Button from '../components/Button';
import ProductModal from '../components/ProductModal';

const ProductsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [sort, setSort] = useState<string>('');
  const [limit, setLimit] = useState<string>('10');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

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

  const handleAddProduct = () => {
    setSelectedProduct({
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
    });
    setIsUpdate(false);
    setModalVisible(true);
  };
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdate(true);
    setModalVisible(true);
  };

  const handleSubmitProduct = async (product: Product) => {
    try {
      if (isUpdate) {
        await updateProduct(product.id, product);
        showSuccess('Product updated successfully!')
      } else {
        await addProduct(product);
        showSuccess('Product added successfully!')
      }
      const response = await fetchProducts();
      setProducts(response);
    } catch (error) {
      showError('Error saving product')
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      const response = await fetchProducts();
      setProducts(response);
      showSuccess('Product deleted successfully')
    } catch (error) {
      showError('Error deleting product')
      console.error('Error deleting product:', error);
    }
  };

  const renderItem = ({item}: {item: Product}) => (
    <ProductItem product={item} onPress={() => handleProductPress(item.id)} onEdit={() => handleEditProduct(item)}
    onDelete={() => handleDeleteProduct(item.id)} />
);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
      <Button title="Filter" onPress={() => setFilterModalVisible(true)}  />
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No products found</Text>}
        numColumns={2}
      />
      <FilterModal
        visible={isFilterModalVisible}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        onLimitChange={handleLimitChange}
        onSortChange={handleSortChange}
        onClose={() => setFilterModalVisible(false)}
      />
      {selectedProduct && (
        <ProductModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmitProduct}
          initialValues={selectedProduct}
          isUpdate={isUpdate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filterContainer:{
    width:'20%',
    marginBottom:30
  }
});

export default ProductsScreen;
