import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import PortfolioScreen from './src/screens/Portfolio';
import TradeScreen from './src/screens/Trade';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Portfolio" component={PortfolioScreen} />
        <Stack.Screen name="Trade" component={TradeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;