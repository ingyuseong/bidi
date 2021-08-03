import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function BottomButton({ leftName, rightName, leftRatio, rightHandler, leftHandler }) {
  return (
    <View style={styles.submitBox}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ ...styles.submitButton, width: `${leftRatio}%` }}
        onPress={leftHandler}>
        <Text style={{ ...styles.submitText }}>{leftName}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.submitButton,
          backgroundColor: '#FF533A',
          borderColor: '#FF533A',
          width: `${100 - leftRatio}%`,
        }}
        onPress={rightHandler}>
        <Text style={{ ...styles.submitText, color: 'white' }}>{rightName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  submitBox: {
    position: 'absolute',
    bottom: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    height: 65,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    borderColor: '#ECEBEB',
    borderTopWidth: 1,
  },
  submitText: {
    color: '#878787',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default BottomButton;
