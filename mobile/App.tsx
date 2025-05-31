import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import FeedScreen from './src/screens/FeedScreen';
import UploadScreen from './src/screens/UploadScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Feed" component={FeedScreen} options={{ tabBarIcon: () => '📚' }} />
          <Tab.Screen name="Upload" component={UploadScreen} options={{ tabBarIcon: () => '⬆️' }} />
          <Tab.Screen name="Progress" component={ProgressScreen} options={{ tabBarIcon: () => '🎯' }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => '👤' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
