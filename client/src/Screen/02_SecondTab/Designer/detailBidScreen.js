import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CardInfo from '../../../Components/Card/cardInfo';
import CardDisableStyle from '../../../Components/Card/cardDisableStyle';
import CardStyle from '../../../Components/Card/cardStyle';
import BidCategory from '../../../Components/Bid/bidCategory';
import BidLetter from '../../../Components/Bid/bidLetter';
import BidNeedCare from '../../../Components/Bid/bidNeedCare';
import BidRefStyle from '../../../Components/Bid/bidRefStyle';
import BidiStorage from '../../../Lib/storage';
import { LARGE_CATEGORY, SMALL_CATEGORY, STORAGE_KEY } from '../../../Lib/constant';

function DetailBidScreen({ navigation, route }) {
  const { info } = route.params;
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [largeCategoryOpen, setLargeCategoryOpen] = useState(false);
  const [largeCategoryValue, setLargeCategoryValue] = useState(info.large_category);
  const [largeCategoryItems, setLargeCategoryItems] = useState(LARGE_CATEGORY);
  const [smallCategoryOpen, setSmallCategoryOpen] = useState(false);
  const [smallCategoryValue, setSmallCategoryValue] = useState(info.small_category);
  const [smallCategoryItems, setSmallCategoryItems] = useState([]);
  const [needCare, setNeedCare] = useState(info.need_care);
  const [bidLetter, setBidLetter] = useState(info.letter);

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
  const editAlert = (id) => {
    Alert.alert('정말 저장하시겠어요?', '', [
      { text: '취소', style: 'cancel' },
      { text: '저장하기', onPress: () => editSubmitHandler(id) },
    ]);
  };
  const editSubmitHandler = async (id) => {
    await fetch('http://127.0.0.1:3000' + `/api/bid/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        large_category: largeCategoryValue,
        small_category: smallCategoryValue,
        need_care: needCare,
        letter: bidLetter,
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('Bid 수정이 성공적으로 완료되었습니다!');
          setIsEdit(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteAlert = (id) => {
    Alert.alert('정말 삭제하시겠어요?', '', [
      { text: '취소', style: 'cancel' },
      { text: '삭제하기', onPress: () => deleteSubmitHandler(id) },
    ]);
  };
  const deleteSubmitHandler = async (id) => {
    await fetch('http://127.0.0.1:3000' + `/api/bid/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('Bid 삭제가 성공적으로 완료되었습니다!');
          navigation.push('BidMain');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const editToggleHandler = () => {
    setIsEdit(true);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {info.status === 'done' || info.status === 'cancel' ? (
          <CardDisableStyle styleImage={info.proposal.after_src} status={info.status} />
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
            name: info.user.name,
            address: info.user.address,
            img_src: info.user.img_src,
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
        {info.status === 'wait' && (
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
