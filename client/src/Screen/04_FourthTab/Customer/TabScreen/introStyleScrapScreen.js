import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

function StyleScrapIntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../../../public/img/temp_image.png')}
          />
        </View>
      </View>
      <View style={styles.headerBox}>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}>마음에 드는</Text>
        </Text>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}>헤어 스타일을 스크랩하세요!</Text>
        </Text>
        <View style={styles.description}>
          <Text style={styles.text}>제안서를 작성하는데 사용하거나</Text>
          <Text style={styles.text}>나만의 스타일 북을 만들어볼 수 있습니다</Text>
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
  contentBox: {
    width: '100%',
    height: '50%',
  },
  imageContainer: {
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    opacity: 0.7,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '85%',
    height: '100%',
  },
  headerBox: {
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
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25,
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

export default StyleScrapIntroScreen;
