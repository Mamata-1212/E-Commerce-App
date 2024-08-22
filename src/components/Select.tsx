import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';

const Select: React.FC<PickerProps> = (props) => (
  <View style={styles.container}>
    <Picker {...props} style={styles.picker} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Select;
