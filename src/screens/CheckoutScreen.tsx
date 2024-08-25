import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  paymentMethod: Yup.string().required('Payment method is required'),
});

const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      paymentMethod: '',
    },
    validationSchema,
    onSubmit: (values) => {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Checkout Successful',
        text2: 'Thank you for your purchase!',
      });
      navigation.replace('ProductList'); 
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        error={formik.touched.name && formik.errors.name? formik.errors.name : ''}
      />
      <TextInput
        placeholder="Address"
        value={formik.values.address}
        onChangeText={formik.handleChange('address')}
        onBlur={formik.handleBlur('address')}
        error={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
      />
      <TextInput
        placeholder="Payment Method"
        value={formik.values.paymentMethod}
        onChangeText={formik.handleChange('paymentMethod')}
        onBlur={formik.handleBlur('paymentMethod')}
        error={formik.touched.paymentMethod && formik.errors.paymentMethod ?  formik.errors.paymentMethod : ''}
      />
      <Button onPress={formik.handleSubmit} title="Checkout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'100%',
    paddingHorizontal:20
  },
});

export default CheckoutScreen;
