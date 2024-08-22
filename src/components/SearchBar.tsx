import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';

const SearchBar: React.FC<TextInputProps> = (props) => (
  <View style={styles.container}>
    <TextInput {...props} style={styles.input} placeholder="Search" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
