import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

import BidiStorage from '../../../Lib/storage';
import { LENGTH_TYPE, STYLE_TYPE, STORAGE_KEY } from '../../../Lib/constant';
import { checkToken } from '../../../Contexts/User';
import { registerBid } from '../../../Contexts/Bid';

import Loading from '../../../Components/Common/loading';
import CardInfo from '../../../Components/Card/cardInfo';
import CardChangeStyle from '../../../Components/Card/cardChangeStyle';

import BidCategory from '../../../Components/Bid/bidCategory';
import BidLetter from '../../../Components/Bid/bidLetter';
import BidNeedCare from '../../../Components/Bid/bidNeedCare';
import BidRefStyle from '../../../Components/Bid/bidRefStyle';

function CreateBidScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { proposal } = route.params;
  const {
    data: userInfo,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const { data: bidList, loading: bidLoading, error: bidError } = useSelector((state) => state.bid);

  const [lengthTypeOpen, setLengthTypeOpen] = useState(false);
  const [lengthTypeValue, setLengthTypeValue] = useState('미선택');
  const [lengthTypeItems, setLengthTypeItems] = useState(LENGTH_TYPE);
  const [styleTypeOpen, setStyleTypeOpen] = useState(false);
  const [styleTypeValue, setStyleTypeValue] = useState(null);
  const [styleTypeItems, setStyleTypeItems] = useState([]);
  const [needCare, setNeedCare] = useState(null);
  const [bidLetter, setBidLetter] = useState('');

  useEffect(() => {
    setStyleTypeItems(STYLE_TYPE[lengthTypeValue]);
  }, [lengthTypeValue]);

  useEffect(() => {
    async function fetchMode() {
      const { token } = await BidiStorage.getData(STORAGE_KEY);
      if (!userInfo) {
        await dispatch(checkToken(token));
      }
    }
    fetchMode();
  }, []);

  const registerBidHandler = async () => {
    console.log('!!');
    const response = await dispatch(
      registerBid({
        customer_id: userInfo.id,
        designer_id: userInfo.id,
        proposal_id: proposal.id,
        large_category: lengthTypeValue,
        small_category: styleTypeValue,
        letter: bidLetter,
        need_care: needCare,
        status: 'wait',
        styles: [1, 2],
      }),
    );
    console.log(bidList, bidLoading, bidError, response);
    if (bidList) {
      Alert.alert('Bid 작성이 성공적으로 완료되었습니다!');
      navigation.navigate('Bid', { screen: 'BidMain' });
    } else {
      console.log('error');
    }
  };

  if (userLoading || userError || bidLoading || bidError) return <Loading loading />;
  if (!userInfo) return null;

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
          lengthTypeOpen={lengthTypeOpen}
          setLengthTypeOpen={setLengthTypeOpen}
          lengthTypeValue={lengthTypeValue}
          setLengthTypeValue={setLengthTypeValue}
          lengthTypeItems={lengthTypeItems}
          setLengthTypeItems={setLengthTypeItems}
          styleTypeOpen={styleTypeOpen}
          setStyleTypeOpen={setStyleTypeOpen}
          styleTypeValue={styleTypeValue}
          setStyleTypeValue={setStyleTypeValue}
          styleTypeItems={styleTypeItems}
          setStyleTypeItems={setStyleTypeItems}
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
