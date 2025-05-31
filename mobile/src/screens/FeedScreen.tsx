import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <Text>This screen will display the feed of trading lessons.</Text>
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

export default FeedScreen;
