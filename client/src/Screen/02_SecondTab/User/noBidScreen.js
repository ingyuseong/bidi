import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

function NoBidScreen({ navigation }) {
  const designerHandler = async () => {
    navigation.navigate('MainTab', { screen: 'Search' });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ marginBottom: 10 }}>
          <Image style={styles.bidIcon} source={require('../../../../public/img/bidIcon.png')} />
        </View>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}>아직 비드가 도착하지</Text>
        </Text>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}>않았어요! </Text>
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.description}>
          <Text style={styles.text}>등록하신 제안서를 검토하거나</Text>
          <Text style={styles.text}>주변 디자이너를 먼저 확인해보세요</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../../../public/img/noBid.png')} />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={designerHandler}>
        <Text style={styles.buttonText}>디자이너 직접 찾아보기 {'>>'}</Text>
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
    width: '90%',
    padding: 20,
    marginBottom: 10,
  },
  bidIcon: {
    width: 35,
    height: 45,
  },
  title: {
    fontSize: 27,
    marginBottom: 6,
  },
  boldTitle: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  content: {
    width: '90%',
    height: '50%',
  },
  imageContainer: {
    width: '85%',
    height: 300,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    marginLeft: 20,
  },
  text: {
    fontSize: 15,
    lineHeight: 25,
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

export default NoBidScreen;
