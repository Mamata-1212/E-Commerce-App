import React, {useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import {login} from '../utils/api';
import {setCredentials} from '../redux/slices/authslice';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {showError, showSuccess} from '../utils/helper';

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const response = await login(values.userName, values.password);
        dispatch(setCredentials({token: response.token, user: response.user}));
        showSuccess('Login Successful');
        navigation.replace('Main');
      } catch (error) {
        showError(error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={formik.values.userName}
          onChangeText={formik.handleChange('userName')}
          onBlur={formik.handleBlur('userName')}
          error={
            formik.touched.userName && formik.errors.userName
              ? formik.errors.userName
              : ''
          }
        />
          <TextInput
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ''
            }
          />
         
      </View>

      <Button onPress={formik.handleSubmit} title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    gap: 40,
  },
  inputContainer: {
    gap: 15,
  },
  
  text: {
    color: 'red',
    fontSize: 30,
  },
});

export default LoginScreen;
