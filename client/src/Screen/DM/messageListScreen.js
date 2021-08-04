import React, { useState, useEffect, createRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

function DMListScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.defaultText}>DM 만들거임 -ㅅ-</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
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
export default DMListScreen;