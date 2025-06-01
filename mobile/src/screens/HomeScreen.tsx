import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name}!</Text>
      <Button
        title="Logout"
        onPress={logout}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
}); 