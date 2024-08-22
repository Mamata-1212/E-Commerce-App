import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Toast, {ErrorToast, SuccessToast} from 'react-native-toast-message';

function App(): React.JSX.Element {
  const toastConfig = {
    success: (props:any) => (
      <SuccessToast text1NumberOfLines={2} text2NumberOfLines={2} {...props} />
    ),
    error: (props:any) => (
      <ErrorToast text1NumberOfLines={2} text2NumberOfLines={2} {...props} />
    ),
  };
  return (
    <SafeAreaView >
      <StatusBar />
        <View style={styles.container}>
          <Provider store={store}>
            <AppNavigator />
            <Toast config={toastConfig} position="top" topOffset={50} />
          </Provider>
        </View>
  </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
   width:'100%', height:'100%'
  },
});

export default App;
