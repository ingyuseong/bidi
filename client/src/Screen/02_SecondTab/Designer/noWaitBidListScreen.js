import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function NoWaitBidListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="document-outline" size={50} />
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>아직 비드를</Text>
        <Text style={styles.titleText}>보내지 않으셨네요!</Text>
      </View>
      <View style={styles.subTitleBox}>
        <Text style={styles.subTitleText}>지금 바로 비드를 보내고</Text>
        <Text style={styles.subTitleText}>더 많은 고객님을 만나보세요!</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('MainTab', { screen: 'Search' })}>
        <Text style={styles.buttonText}>고객님 보러가기 {'>>'}</Text>
      </TouchableOpacity>
      <View style={styles.imageBox}>
        <Image source={require('../../../../public/img/noBidList.jpg')} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 32,
    zIndex: 1,
  },
  titleBox: {
    marginTop: 16,
    marginBottom: 16,
    zIndex: 1,
  },
  titleText: {
    color: '#0A0A32',
    fontSize: 23,
    lineHeight: 35,
    fontWeight: 'bold',
  },
  subTitleBox: {
    zIndex: 1,
  },
  subTitleText: {
    color: '#0A0A32',
    fontSize: 16,
    lineHeight: 25,
  },
  imageBox: {
    zIndex: 0,
  },
  image: {
    position: 'absolute',
    bottom: -32,
    right: -32,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderRadius: 55,
    backgroundColor: '#0a0a32',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: '90%',
    zIndex: 1,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
});

export default NoWaitBidListScreen;
