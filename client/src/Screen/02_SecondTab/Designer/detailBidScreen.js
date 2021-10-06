import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import CardInfo from '../../../Components/Card/cardInfo';
import CardDisableStyle from '../../../Components/Card/cardDisableStyle';
import CardStyle from '../../../Components/Card/cardStyle';

import BidCategory from '../../../Components/Bid/bidCategory';
import BidLetter from '../../../Components/Bid/bidLetter';
import BidNeedCare from '../../../Components/Bid/bidNeedCare';
import BidRefStyle from '../../../Components/Bid/bidRefStyle';

import BidAPI from '../../../Api/bid';
import { patchBid, deleteBid } from '../../../Contexts/Designer/Bid';
import { STYLE_TYPE, LENGTH_TYPE } from '../../../Lib/constant';

function DetailBidScreen({ navigation, route }) {
  const { info, screen } = route.params;

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [lengthTypeOpen, setLengthTypeOpen] = useState(false);
  const [lengthTypeValue, setLengthTypeValue] = useState(info.length_type);
  const [lengthTypeItems, setLengthTypeItems] = useState(LENGTH_TYPE);
  const [styleTypeOpen, setStyleTypeOpen] = useState(false);
  const [styleTypeValue, setStyleTypeValue] = useState(info.style_type);
  const [styleTypeItems, setStyleTypeItems] = useState([]);

  const [styleMenuList, setStyleMenuList] = useState(info.bidStyles);
  const [needCare, setNeedCare] = useState(info.need_care);
  const [bidLetter, setBidLetter] = useState(info.letter);
  useEffect(() => {
    setStyleTypeItems(STYLE_TYPE[lengthTypeValue]);
  }, [lengthTypeValue]);

  const editAlert = (id) => {
    Alert.alert('정말 저장하시겠어요?', '', [
      { text: '취소', style: 'cancel' },
      { text: '저장하기', onPress: () => editSubmitHandler(id) },
    ]);
  };
  const editSubmitHandler = async (id) => {
    const styleIdList = styleMenuList.map((style) => style.id);
    const bodyData = {
      length_type: lengthTypeValue,
      style_type: styleTypeValue,
      need_care: needCare,
      letter: bidLetter,
      styleIdList: styleIdList,
    };
    const response = BidAPI.patchBid(id, bodyData);
    if (response) {
      dispatch(patchBid(id, { ...bodyData, bidStyles: styleMenuList }));
      Alert.alert('Bid 수정이 성공적으로 완료되었습니다!');
      setIsEdit(false);
    }
  };
  const deleteAlert = (id) => {
    Alert.alert('정말 삭제하시겠어요?', '', [
      { text: '취소', style: 'cancel' },
      { text: '삭제하기', onPress: () => deleteSubmitHandler(id) },
    ]);
  };
  const deleteSubmitHandler = async (id) => {
    const response = BidAPI.deleteBid(id);
    if (response) {
      dispatch(deleteBid(id));
      Alert.alert('Bid 삭제가 성공적으로 완료되었습니다!');
      navigation.reset({ routes: [{ name: 'BidMain' }] });
    }
  };
  const editToggleHandler = () => {
    setIsEdit(true);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {info.matching === true ? (
          <CardDisableStyle styleImage={info.proposal.after_src} matched={info.matching} />
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
            address: info.proposal.address,
            img_src: info.proposal.before_src,
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
        {screen === 'bid' && (
          <View style={styles.bottomBtnArea}>
            {isEdit ? (
              <TouchableOpacity
                style={[styles.bottomBtn, styles.rightBtn]}
                onPress={() => editAlert(info.id)}>
                <Text style={styles.rightBtnText}>저장하기</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.bottomBtn, styles.leftBtn]}
                  onPress={() => deleteAlert(info.id)}>
                  <Text style={styles.leftBtnText}>삭제하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bottomBtn, styles.rightBtn]}
                  onPress={editToggleHandler}>
                  <Text style={styles.rightBtnText}>수정하기</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
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
export default DetailBidScreen;
