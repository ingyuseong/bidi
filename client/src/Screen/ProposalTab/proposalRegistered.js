import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

function ProposalRegisteredScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>제안서 등록이 완료되었습니다!! ㄱㄷㄱㄷ</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.buttonText}>브랜딩 페이지 둘러보기</Text>
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
  header: {
    width:'100%',
    height:'25%',
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    marginBottom: 6
  },
  boldTitle: {
    fontSize: 27,
    fontWeight: 'bold'
  },
  content: {
      width:'100%',
      height:'60%',
  },
  imageContainer: {
    flex: 1,
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    width: '100%',
    height:'100%',
  },
  image: {
    width: '70%',
    height:'99%',
  },
  description: {
    flex: 1,
    position: 'absolute',
    left: '5%', 
    top: '10%',
    height: '15%',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 3
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 46,
    marginTop: 25,
    borderRadius: 3,
    backgroundColor: "tomato"
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white'
  }
});

export default ProposalRegisteredScreen;
