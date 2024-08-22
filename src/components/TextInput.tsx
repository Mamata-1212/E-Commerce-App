import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';

const TextInput: React.FC<TextInputProps> = (props) => (
  <RNTextInput {...props} style={[styles.input, props.style]} />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 40,
    width: '100%',
  },
});

export default TextInput;
