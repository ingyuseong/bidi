import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import CardInfo from '../../../Components/Card/cardInfo';
import CardDisableStyle from '../../../Components/Card/cardDisableStyle';
import CardStyle from '../../../Components/Card/cardStyle';
import BidCategory from '../../../Components/Bid/bidCategory';
import BidLetter from '../../../Components/Bid/bidLetter';
import BidNeedCare from '../../../Components/Bid/bidNeedCare';
import BidRefStyle from '../../../Components/Bid/bidRefStyle';
import BidiStorage from '../../../Lib/storage';
import { LARGE_CATEGORY, SMALL_CATEGORY, STORAGE_KEY } from '../../../Lib/constant';

function HistoryDetailScreen({ navigation, route }) {
  const { info } = route.params;
  const [isEdit, setIsEdit] = useState(false);
  const [largeCategoryOpen, setLargeCategoryOpen] = useState(false);
  const [largeCategoryValue, setLargeCategoryValue] = useState(info.bid.large_category);
  const [largeCategoryItems, setLargeCategoryItems] = useState(LARGE_CATEGORY);
  const [smallCategoryOpen, setSmallCategoryOpen] = useState(false);
  const [smallCategoryValue, setSmallCategoryValue] = useState(info.bid.small_category);
  const [smallCategoryItems, setSmallCategoryItems] = useState([]);
  const [needCare, setNeedCare] = useState(info.bid.need_care);
  const [bidLetter, setBidLetter] = useState(info.bid.letter);

  useEffect(() => {
    setSmallCategoryItems(SMALL_CATEGORY[largeCategoryValue]);
  }, [largeCategoryValue]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {info.bid.status === 'done' || info.bid.status === 'cancel' ? (
          <CardDisableStyle styleImage={info.proposal.after_src} status={info.bid.status} />
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
            name: info.customer.name,
            address: info.customer.address,
            img_src: info.customer.img_src,
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
          isEdit={isEdit}
        />
        <BidNeedCare needCare={needCare} setNeedCare={setNeedCare} isEdit={isEdit} />
        <BidLetter bidLetter={bidLetter} setBidLetter={setBidLetter} isEdit={isEdit} />
        <BidRefStyle />
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
