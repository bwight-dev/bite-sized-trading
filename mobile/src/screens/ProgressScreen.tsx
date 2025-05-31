import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text>This screen will show the user's learning progress.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProgressScreen;
