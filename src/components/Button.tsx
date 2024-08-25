import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]} >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2aa1d9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderColor:'#2ad9cf',
    borderWidth:1
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;
