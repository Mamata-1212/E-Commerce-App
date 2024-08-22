import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // You might need to install expo/vector-icons if not already installed
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Products"
      component={LoginScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="store" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={LoginScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cart" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Checkout"
      component={LoginScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="credit-card" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
