import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function RegisteredBiidScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../../../public/img/finish_biid.jpg')} style={styles.img} />
      </View>
      <View style={styles.textArea}>
        <View style={styles.rowArea}>
          <View style={styles.firstRowArea}>
            <Text style={[styles.text, styles.boldText]}>비드 등록이 완료</Text>
            <Text style={styles.text}>되었습니다</Text>
          </View>
          <Text style={styles.text}>조금만 기다려주세요!</Text>
        </View>
        <Text style={styles.normalText}>곧 고객님이 비드에 응답해주실 거에요!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
  },
  img: {
    width: 380,
    height: 380,
    marginLeft: -49,
    marginTop: 48,
    marginBottom: 48,
  },
  textArea: {
    marginLeft: 60,
  },
  firstRowArea: {
    flexDirection: 'row',
  },
  rowArea: {
    marginBottom: 16,
  },
  text: {
    fontSize: 23,
    fontWeight: '400',
    lineHeight: 35,
    color: '#111111',
  },
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#111111',
  },
});

export default RegisteredBiidScreen;
