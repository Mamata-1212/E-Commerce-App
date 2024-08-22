import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListingScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => (
  <Tab.Navigator >
    <Tab.Screen
      name="Products"
      component={ProductListScreen}
      // options={{
      //   tabBarIcon: ({ color, size }) => (
      //     <MaterialCommunityIcons name="store" color={color} size={size} />
      //   ),
      // }}
    />
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      // options={{
      //   tabBarIcon: ({ color, size }) => (
      //     <MaterialCommunityIcons name="cart" color={color} size={size} />
      //   ),
      // }}
    />
    <Tab.Screen
      name="Checkout"
      component={CheckoutScreen}
      // options={{
      //   tabBarIcon: ({ color, size }) => (
      //     <MaterialCommunityIcons name="credit-card" color={color} size={size} />
      //   ),
      // }}
    />
    <Tab.Screen name="Profile" component={UserProfileScreen} options={{ title: 'Profile' }} />

  </Tab.Navigator>
);

export default BottomTabNavigator;
