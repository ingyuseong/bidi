import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function BidNeedCare({ needCare, setNeedCare, isEdit }) {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>케어가 필요하신가요?</Text>
      </View>
      {isEdit ? (
        <View style={styles.needCareArea}>
          <TouchableOpacity
            style={[styles.needCareBtn, needCare === true && styles.active]}
            onPress={() => setNeedCare(true)}>
            <Text style={[styles.needCareText, needCare === true && styles.active]}>네</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.needCareBtn, needCare === false && styles.active]}
            onPress={() => setNeedCare(false)}>
            <Text style={[styles.needCareText, needCare === false && styles.active]}>아니오</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ ...styles.needCareBtn, backgroundColor: '#F5F5F5', borderWidth: 0 }}>
          <Text style={{ ...styles.needCareText, color: '#111111' }}>
            {needCare ? '네' : '아니오'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    margin: 16,
    marginTop: 0,
    marginBottom: 24,
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
  needCareArea: {
    flexDirection: 'row',
  },
  needCareBtn: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  needCareText: {
    color: '#878787',
    fontSize: 14,
    lineHeight: 17,
  },
  active: {
    borderColor: '#0A0A32',
    color: '#0A0A32',
  },
});

export default BidNeedCare;
