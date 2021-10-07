import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';

function ContentLandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../../public/img/logo.png')}
            resizeMode="center"
          />
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}>다양한 컨텐츠가</Text> 준비중이에요
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>조금만 기다려주세요!</Text>
        </View>
      </View>
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
    height: '30%',
  },
  imageContainer: {
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '100%',
  },
  image: {
    width: '100%',
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

export default ContentLandingScreen;
