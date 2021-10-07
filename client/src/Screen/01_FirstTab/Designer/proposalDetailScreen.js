import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import CardInfo from '../../../Components/Card/cardInfo';
import CardStyle from '../../../Components/Card/cardStyle';
import CardChangeStyle from '../../../Components/Card/cardChangeStyle';

function ProposalDetailScreen({ navigation, route, props }) {
  const { proposal } = route ? route.params : props;
  const acceptHandler = () => {
    navigation.navigate('CreateBid', { proposal });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <CardChangeStyle
          before_src={proposal.before_src}
          after_src={proposal.after_src}
          height={400}
          topRadius={false}
        />
        <CardInfo
          info={proposal}
          navigation={navigation}
          tagBackgroundColor="#E1ECFF"
          tagColor="#323274"
        />
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitleText}>희망 예산</Text>
          <View style={styles.priceArea}>
            <Text style={styles.priceText}>{proposal.price_limit}원 이하</Text>
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
  container: {
    position: 'relative',
    flex: 1,
  },
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
