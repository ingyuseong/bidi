import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { STYLE_TYPE, LENGTH_TYPE } from '../../../Lib/constant';

import CardInfo from '../../../Components/Card/cardInfo';
import CardStyle from '../../../Components/Card/cardStyle';
import CardDisableStyle from '../../../Components/Card/cardDisableStyle';

import BidCategory from '../../../Components/Bid/bidCategory';
import BidLetter from '../../../Components/Bid/bidLetter';
import BidNeedCare from '../../../Components/Bid/bidNeedCare';
import BidRefStyle from '../../../Components/Bid/bidRefStyle';

function HistoryDetailScreen({ navigation, route }) {
  const { info } = route.params;

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [lengthTypeOpen, setLengthTypeOpen] = useState(false);
  const [lengthTypeValue, setLengthTypeValue] = useState(info.bid.length_type);
  const [lengthTypeItems, setLengthTypeItems] = useState(LENGTH_TYPE);
  const [styleTypeOpen, setStyleTypeOpen] = useState(false);
  const [styleTypeValue, setStyleTypeValue] = useState(info.bid.style_type);
  const [styleTypeItems, setStyleTypeItems] = useState([]);

  const [styleMenuList, setStyleMenuList] = useState(info.bid.bidStyles);
  const [needCare, setNeedCare] = useState(info.bid.need_care);
  const [bidLetter, setBidLetter] = useState(info.bid.letter);

  useEffect(() => {
    setStyleTypeItems(STYLE_TYPE[lengthTypeValue]);
  }, [lengthTypeValue]);
  return (
    <View style={styles.container}>
      <ScrollView>
        {info.bid.matching === true ? (
          <CardDisableStyle styleImage={info.proposal.after_src} matched={info.bid.matching} />
        ) : (
          <CardStyle
            styleLists={[info.proposal.before_src, info.proposal.after_src]}
            height={400}
            isUser={false}
          />
        )}

        <CardInfo
          info={{
            ...info,
            description: info.proposal.description,
            name: info.proposal.user.name,
            address: info.proposal.user.address,
            img_src: info.proposal.user.img_src,
            distance_limit: info.proposal.distance_limit,
          }}
          navigation={navigation}
        />
        <View style={styles.priceContainer}>
          <View style={styles.titleTextArea}>
            <Text style={styles.titleText}>희망 예산</Text>
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.text}>{info.proposal.price_limit}원 이하</Text>
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
          isEdit={isEdit}
        />
        <BidNeedCare needCare={needCare} setNeedCare={setNeedCare} isEdit={isEdit} />
        <BidLetter bidLetter={bidLetter} setBidLetter={setBidLetter} isEdit={isEdit} />
        <BidRefStyle
          navigation={navigation}
          title="추천 스타일"
          styleMenuList={styleMenuList}
          setStyleMenuList={setStyleMenuList}
          nextTo="DetailBid"
          isEdit={isEdit}
        />
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
export default HistoryDetailScreen;
