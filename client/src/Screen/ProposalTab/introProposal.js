import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

function ProposalIntroScreen({ navigation }) {
  const proposalHandler = async () => {
    navigation.replace('CreateProposal');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>제안서를 등록하고</Text>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}>나에게 딱 맞는</Text>
        </Text>
        <Text style={styles.title}>
          <Text style={styles.boldTitle}>헤어디자이너를 </Text>만나보세요
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../../public/img/proposal_intro.png')} />
        </View>
        <View style={styles.description}>
          <Text style={styles.text}>기존 사진을 등록하거나</Text>
          <Text style={styles.text}>AI를 통해 새로운 스타일을 시도해볼 수 있습니다</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={proposalHandler}>
            <Text style={styles.buttonText}>제안서 등록하기</Text>
          </TouchableOpacity>
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
  header: {
    width: '100%',
    height: '25%',
    padding: 20,
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
  content: {
    width: '100%',
    height: '60%',
  },
  imageContainer: {
    flex: 1,
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '70%',
    height: '99%',
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
    marginBottom: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 46,
    marginTop: 25,
    borderRadius: 3,
    backgroundColor: '#FF533A',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
});

export default ProposalIntroScreen;
