// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';

const Splash: React.FC<{ navigation: any }> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide(); 
      navigation.replace('Login');
    }, 5000); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../asests/Animation.json')} 
        autoPlay
        resizeMode='cover'
        loop={true}
        style={{width:'100%', height:'100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
});

export default Splash;
