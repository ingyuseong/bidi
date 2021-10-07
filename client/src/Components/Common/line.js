import React from 'react';
import { StyleSheet, View } from 'react-native';

function Line() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: '#f4f4f4',
  },
});

export default Line;
