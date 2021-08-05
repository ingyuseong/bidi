import React, { useState, useEffect, createRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

function DMScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.defaultText}>여기서 채팅하면 됨</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
},
defaultText: {
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default DMScreen;