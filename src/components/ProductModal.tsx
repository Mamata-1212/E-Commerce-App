import React from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import TextInput from './TextInput';
import {Product} from '../types';
import Button from './Button';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  initialValues: Product;
  isUpdate?: boolean;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  image: yup
    .string()
    .required('Image URL is required')
    .url('Must be a valid URL'),
});

const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const handleFormSubmit = async (values: Product) => {
    try {
      onSubmit(values);
      onClose();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View>
                <TextInput
                  placeholder="Title"
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                />
                {errors.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}

                <TextInput
                  placeholder="Price"
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={String(values.price)}
                  keyboardType="numeric"
                />
                {errors.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}

                <TextInput
                  placeholder="Description"
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
                {errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}

                <TextInput
                  placeholder="Category"
                  onChangeText={handleChange('category')}
                  onBlur={handleBlur('category')}
                  value={values.category}
                />
                {errors.category && (
                  <Text style={styles.errorText}>{errors.category}</Text>
                )}

                <TextInput
                  placeholder="Image URL"
                  onChangeText={handleChange('image')}
                  onBlur={handleBlur('image')}
                  value={values.image}
                />
                {errors.image && (
                  <Text style={styles.errorText}>{errors.image}</Text>
                )}
                <View style={styles.buttonContainer}>
                  <Button
                    title={isUpdate ? 'Update Product' : 'Add Product'}
                    onPress={() => handleSubmit()}
                  />
                  <Button title="Cancel" onPress={onClose} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default ProductModal;
