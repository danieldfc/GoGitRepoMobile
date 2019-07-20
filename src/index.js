import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Olá Rocketseat</Text>
    </View>
  );
}
