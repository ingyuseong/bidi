import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

function NoHistoryScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../public/img/finish_bid.jpg')} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.titleText}>
          <Text style={styles.bold}>매칭 히스토리가</Text>
        </Text>
        <Text style={styles.titleText}>아직 등록되지 않았어요</Text>
        <Text style={styles.noHistoryText}>매칭 완료 후 첫 번째 리뷰를 남겨보세요!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(70),
  },
  image: {
    marginTop: 60,
    width: '80%',
    height: '55%',
  },
  textBox: {
    marginTop: 20,
    marginLeft: 50,
  },
  titleText: {
    fontSize: 25,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  noHistoryText: {
    marginTop: 10,
    fontSize: 15,
    color: '#8D8D8D',
  },
});

export default NoHistoryScreen;
