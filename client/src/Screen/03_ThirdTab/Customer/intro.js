import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

function MatchingExistScreen({ navigation }) {
  const designerHandler = async () => {
    navigation.replace('MainTab', { screen: 'Bid' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.boldTitle}>BiDi AI 디자이너</Text>
      </Text>
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
