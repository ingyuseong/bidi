import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Button({ title, pressHandler }) {
  return (
    <TouchableOpacity style={styles.buttonArea} onPress={pressHandler}>
      <View>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonArea: {
    width: 60,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    alignItems: 'center',
  },
  buttonText: {
    color: 'gray',
  },
});

export default Button;
