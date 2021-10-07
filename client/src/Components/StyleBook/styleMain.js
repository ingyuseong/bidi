import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function StyleMain({ styleMain, setStyleMain, isEdit }) {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>대표시술로 등록할까요?</Text>
      </View>
      {isEdit ? (
        <View style={styles.styleMainArea}>
          <TouchableOpacity
            style={[styles.styleMainBtn, styleMain === true && styles.active]}
            onPress={() => setStyleMain(true)}>
            <Text style={[styles.styleMainText, styleMain === true && styles.active]}>네</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.styleMainBtn, styleMain === false && styles.active]}
            onPress={() => setStyleMain(false)}>
            <Text style={[styles.styleMainText, styleMain === false && styles.active]}>아니오</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ ...styles.styleMainBtn, backgroundColor: '#F5F5F5', borderWidth: 0 }}>
          <Text style={{ ...styles.styleMainText, color: '#111111' }}>
            {styleMain ? '네' : '아니오'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    margin: 16,
    marginBottom: 32,
    zIndex: 0,
  },
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  titleTextArea: {
    marginBottom: 16,
  },
  styleMainArea: {
    flexDirection: 'row',
  },
  styleMainBtn: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  styleMainText: {
    color: '#878787',
    fontSize: 14,
    lineHeight: 17,
  },
  active: {
    borderColor: '#0A0A32',
    color: '#0A0A32',
  },
});

export default StyleMain;
