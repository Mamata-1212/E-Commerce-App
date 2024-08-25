import React from 'react';
import { TextInput as RNTextInput, StyleSheet, Text, View, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  error?: string;
}

const TextInput: React.FC<Props> = ({ error, ...props }) => (
  <View style={styles.container}>
    <RNTextInput {...props} style={[styles.input, props.style]} />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width:'100%'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 40,
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default TextInput;
