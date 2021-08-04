import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import CardInfo from '../../../Components/Card/cardInfo';
import CardStyle from '../../../Components/Card/cardStyle';

function ProposalDetailScreen({ navigation, route }) {
  const { info, userId, proposalId } = route.params;
  const acceptHandler = () => {
    navigation.navigate('CreateBid', { info, userId, proposalId });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <CardStyle styleLists={info.images} height={400} />
        <CardInfo info={info} navigation={navigation} />
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitleText}>희망 예산</Text>
          <View style={styles.priceArea}>
            <Text style={styles.priceText}>{info.price_limit}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBtnArea}>
        <TouchableOpacity style={[styles.bottomBtn, styles.leftBtn]}>
          <Text style={styles.leftBtnText}>거절하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomBtn, styles.rightBtn]} onPress={acceptHandler}>
          <Text style={styles.rightBtnText}>비드 작성하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  priceContainer: {
    marginTop: 26,
    marginBottom: 80,
    marginLeft: 16,
    marginRight: 16,
  },
  priceTitleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  priceArea: {
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    height: 40,
    marginTop: 13,
  },
  priceText: {
    color: '#111111',
    lineHeight: 17,
    fontSize: 14,
    padding: 13,
  },
  bottomBtnArea: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  bottomBtn: {
    flex: 1,
    justifyContent: 'center',
    height: 65,
  },
  leftBtn: {
    backgroundColor: '#fff',
  },
  rightBtn: {
    backgroundColor: '#0A0A32',
  },
  leftBtnText: {
    color: '#878787',
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 22,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  rightBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 22,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});

export default ProposalDetailScreen;
