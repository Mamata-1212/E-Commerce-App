import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
