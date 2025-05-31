import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UploadScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload</Text>
      <Text>This screen will allow users to upload trading content.</Text>
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

export default UploadScreen;
