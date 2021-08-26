import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CardInfo from '../../../Components/Card/cardInfo';
import CardChangeStyle from '../../../Components/Card/cardChangeStyle';

import BidCategory from '../../../Components/Bid/bidCategory';
import BidLetter from '../../../Components/Bid/bidLetter';
import BidNeedCare from '../../../Components/Bid/bidNeedCare';
import BidRefStyle from '../../../Components/Bid/bidRefStyle';
import BidiStorage from '../../../Lib/storage';
import { LARGE_CATEGORY, SMALL_CATEGORY, STORAGE_KEY } from '../../../Lib/constant';

function CreateBidScreen({ navigation, route }) {
  const { proposal } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const [largeCategoryOpen, setLargeCategoryOpen] = useState(false);
  const [largeCategoryValue, setLargeCategoryValue] = useState('미선택');
  const [largeCategoryItems, setLargeCategoryItems] = useState(LARGE_CATEGORY);
  const [smallCategoryOpen, setSmallCategoryOpen] = useState(false);
  const [smallCategoryValue, setSmallCategoryValue] = useState(null);
  const [smallCategoryItems, setSmallCategoryItems] = useState([]);
  const [needCare, setNeedCare] = useState(null);
  const [bidLetter, setBidLetter] = useState('');

  useEffect(() => {
    setSmallCategoryItems(SMALL_CATEGORY[largeCategoryValue]);
  }, [largeCategoryValue]);

  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      setUserInfo(user);
    }
    fetchMode();
  }, []);

  const registerBidHandler = async () => {
    await fetch('http://127.0.0.1:3000' + '/api/bid/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        // customer_id: userId,
        designer_id: userInfo.id,
        proposal_id: proposal.id,
        large_category: largeCategoryValue,
        small_category: smallCategoryValue,
        letter: bidLetter,
        need_care: needCare,
        status: 'wait',
        styles: [1, 2, 3],
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('Bid 작성이 성공적으로 완료되었습니다!');
          navigation.navigate('Bid', { screen: 'BidMain' });
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
          <View style={styles.titleTextArea}>
            <Text style={styles.titleText}>희망 예산</Text>
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.text}>{proposal.price_limit}원 이하</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <BidCategory
          largeCategoryOpen={largeCategoryOpen}
          setLargeCategoryOpen={setLargeCategoryOpen}
          largeCategoryValue={largeCategoryValue}
          setLargeCategoryValue={setLargeCategoryValue}
          largeCategoryItems={largeCategoryItems}
          setLargeCategoryItems={setLargeCategoryItems}
          smallCategoryOpen={smallCategoryOpen}
          setSmallCategoryOpen={setSmallCategoryOpen}
          smallCategoryValue={smallCategoryValue}
          setSmallCategoryValue={setSmallCategoryValue}
          smallCategoryItems={smallCategoryItems}
          setSmallCategoryItems={setSmallCategoryItems}
          isEdit={true}
        />
        <BidNeedCare needCare={needCare} setNeedCare={setNeedCare} isEdit={true} />
        <BidLetter bidLetter={bidLetter} setBidLetter={setBidLetter} isEdit={true} />
        <BidRefStyle />
        <View style={styles.bottomBtnArea}>
          <TouchableOpacity style={[styles.bottomBtn, styles.leftBtn]}>
            <Text style={styles.leftBtnText}>임시저장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBtn, styles.rightBtn]}
            onPress={registerBidHandler}>
            <Text style={styles.rightBtnText}>발송하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'scroll', backgroundColor: 'white' },
  priceContainer: {
    marginTop: 26,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  boxContainer: {
    margin: 16,
    marginTop: 0,
    marginBottom: 24,
    zIndex: 0,
  },

  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  titleTextArea: {
    marginBottom: 16,
  },
  priceArea: {
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    height: 40,
  },
  text: {
    color: '#111111',
    lineHeight: 17,
    fontSize: 14,
    padding: 13,
  },
  line: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    height: 9,
    marginBottom: 16,
  },

  bottomBtnArea: {
    flexDirection: 'row',
  },
  bottomBtn: {
    justifyContent: 'center',
    height: 65,
  },
  leftBtn: {
    flex: 2,
    backgroundColor: '#fff',
  },
  rightBtn: {
    flex: 3,
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
export default CreateBidScreen;
