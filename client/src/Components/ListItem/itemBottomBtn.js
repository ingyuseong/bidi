import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

function ItemBottomBtn({
  info,
  leftBtnText,
  leftBtnHandler,
  rightBtnText,
  rightBtnHandler,
  isMain,
}) {
  // status : wait, process, done, cancel, default
  let status = info.status ? info.status : 'default';
  let btnDisable = status === 'cancel' || status == 'done' ? true : false;

  if (isMain) {
    status = 'done';
    btnDisable = false;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btnBox, status === 'cancel' && styles.active]}
        onPress={leftBtnHandler}
        disabled={btnDisable}>
        <Text style={[styles.btnText, status === 'cancel' && styles.active]}>{leftBtnText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btnBox, status === 'done' ? styles.active : styles.defaultBorder]}
        onPress={rightBtnHandler}
        disabled={btnDisable}>
        <Text style={[styles.btnText, status === 'done' ? styles.active : styles.defaultText]}>
          {rightBtnText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    justifyContent: 'space-between',
  },
  btnBox: {
    width: '49%',
    height: 36,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#8D8D8D',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: -0.5,
  },
  active: {
    backgroundColor: '#0A0A32',
    borderColor: '#0A0A32',
    color: '#FFFFFF',
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: '#0A0A32',
    borderRadius: 2,
  },
  defaultText: {
    color: '#0A0A32',
  },
});

export default ItemBottomBtn;
