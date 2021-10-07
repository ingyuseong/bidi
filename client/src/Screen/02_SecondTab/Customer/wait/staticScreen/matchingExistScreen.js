import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

function MatchingExistScreen({ navigation }) {
  const designerHandler = async () => {
    navigation.replace('MainTab', { screen: 'Bid' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../../../public/img/temp_image.png')} />
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}>이미 매칭이 진행 중</Text>입니다
        </Text>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}></Text>매칭을 확인해주세요!
        </Text>
        <View style={styles.description}>
          <Text style={styles.text}>시간정보와 스타일을 결정해서</Text>
          <Text style={styles.text}>시술을 받아보세요!</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={designerHandler}>
        <Text style={styles.buttonText}>매칭 정보 확인하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    width: '100%',
    height: '50%',
  },
  imageContainer: {
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '85%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: '27%',
    padding: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    marginBottom: 6,
  },
  boldTitle: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    height: '15%',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 55,
    borderRadius: 55,
    backgroundColor: '#FF533A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
});

export default MatchingExistScreen;
