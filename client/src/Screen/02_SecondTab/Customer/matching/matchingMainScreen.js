import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  priceFormating,
  styleTypeFormatting,
  lengthTypeFormatting,
  genderTypeFormatting,
} from '../../../../Lib/utils';

// Components
import BottomButton from '../../../../Components/Common/bottomButton';
import StylingTime from '../../../../Components/Reservation/stylingTime';

// API
import MatchingAPI from '../../../../Api/matching';

// Redux Action
import { deleteMatching } from '../../../../Contexts/Customer/Matching/action';

function ReservationScreen({ navigation }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  const [styleMenu, setStyleMenu] = useState(null);
  const [styleTime, setStyleTime] = useState(null);
  const dispatch = useDispatch();
  const removeMatching = async () => {
    const response = await MatchingAPI.deleteMatching(matching[0].id);
    if (response) {
      dispatch(deleteMatching(matching[0].id));
      Alert.alert('삭제 되었습니다!');
      navigation.push('Wait');
    } else {
      Alert.alert('삭제에 실패했습니다');
    }
  };
  const deleteAlert = () => {
    Alert.alert('정말 취소하시겠습니까?', '매칭을 취소할 경우 다시 제안서를 작성해야 합니다!', [
      { text: '아니요', style: 'cancel' },
      { text: '취소하기', onPress: removeMatching },
    ]);
  };
  const submitReservation = async () => {
    if (!styleMenu) {
      Alert.alert('스타일을 선택해 주세요!');
    } else if (!styleTime) {
      Alert.alert('시간을 선택해 주세요!');
    } else {
      const body = {
        // 스케줄 등록 관련 정보 -> Schedule에 새롭게 생성될 정보
        designer_id: matching[0].designer_id,
        matching_id: matching[0].id,
        schedule_type: 'matching',
        time: styleTime,

        // 예약 관련 정보 -> Matching에 업데이트 될 정보
        style_id: styleMenu.id,
        style_time: styleTime,
      };
      const matchingReservationCount = await MatchingAPI.patchMatchingReservation(
        matching[0].id,
        body,
      );
      if (matchingReservationCount) {
        navigation.reset({ routes: [{ name: 'Main' }] });
      } else {
        Alert.alert('이미 예약된 시간입니다.', '시간을 다시 선택해 주세요!');
      }
    }
  };
  const submitAlert = () => {
    Alert.alert('정말 예약하시겠습니까?', '예약 이후에는 디자이너와의 DM으로만 취소 가능합니다', [
      { text: '아니요', style: 'cancel' },
      { text: '예약하기', onPress: submitReservation },
    ]);
  };
  const styleSelectHandler = async (e) => {
    setStyleMenu(null);
    navigation.push('StyleSelect', {
      setStyleMenu: setStyleMenu,
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>시술할 스타일 선택</Text>
          </View>
          <View style={styles.styleContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.imageBox}>
                {styleMenu ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.imageAfter}
                    onPress={styleSelectHandler}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      source={{
                        uri: styleMenu.front_img_src,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.image}>
                    <TouchableOpacity activeOpacity={0.8} onPress={styleSelectHandler}>
                      <Text style={styles.imageLabel}>스타일 선택하기</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.imageTypeLabel}>
                  <Text style={styles.imageTypeLabelText}>Style</Text>
                </View>
              </View>
              {styleMenu ? (
                <View style={styles.styleBox}>
                  <View style={styles.tagBox}>
                    <View style={styles.nameTag}>
                      <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>스타일</Text>
                    </View>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{styleMenu.title}</Text>
                    </View>
                  </View>
                  <View style={styles.tagBox}>
                    <View style={styles.nameTag}>
                      <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>타입</Text>
                    </View>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>
                        {styleTypeFormatting(styleMenu.style_type)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tagBox}>
                    <View style={styles.nameTag}>
                      <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>길이</Text>
                    </View>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>
                        {lengthTypeFormatting(styleMenu.length_type)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tagBox}>
                    <View style={styles.nameTag}>
                      <Text style={{ color: '#8D8D8D', fontWeight: 'bold' }}>성별</Text>
                    </View>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>
                        {genderTypeFormatting(styleMenu.gender_type)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ ...styles.tagBox, marginTop: 20 }}>
                    <View style={styles.priceTag}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>금액</Text>
                    </View>
                    <View style={styles.priceTagActive}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>
                        {priceFormating(styleMenu.price)} 원
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.styleBox}>
                  <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#8D8D8D' }}>스타일을 선택하면</Text>
                    <Text style={{ color: '#8D8D8D' }}>세부정보가 표시됩니다</Text>
                  </View>
                  <View style={{ ...styles.tagBox, marginTop: 20 }}>
                    <View style={styles.priceTag}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>금액</Text>
                    </View>
                    <View style={styles.priceTag}>
                      <Text style={{ color: '#8D8D8D' }}>0 원</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={{ marginTop: 20 }}></View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>스타일링 시간 선택</Text>
          </View>
          <StylingTime navigation={navigation} setStyleTime={setStyleTime} />
        </View>
      </View>
      <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#8D8D8D' }}>디자이너와의 DM을 통해</Text>
        <Text style={{ color: '#8D8D8D' }}>디테일한 시술 요청을 전달해보세요!</Text>
      </View>
      <BottomButton
        leftName="취소하기"
        rightName="예약완료"
        leftRatio={50}
        leftHandler={deleteAlert}
        rightHandler={submitAlert}
        notBottomRadius={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBox: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 200,
  },
  imageBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-around',
    width: '50%',
    height: '100%',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '90%',
    borderColor: 'rgb(243,243,243)',
    borderWidth: 1,
    backgroundColor: 'rgb(243,243,243)',
  },
  imageAfter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '90%',
    borderColor: 'rgb(243,243,243)',
    borderWidth: 1,
  },
  imageLabel: {
    fontSize: 15,
    color: 'rgb(153,153,153)',
  },
  imageTypeLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 70,
    height: 26,
    left: 1,
    bottom: 0,
    backgroundColor: '#FF533A',
    borderRadius: 3,
  },
  imageTypeLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  styleBox: {
    flexDirection: 'column',
    height: '100%',
    width: '50%',
    marginTop: 10,
  },
  descriptionBox: {
    width: '100%',
    alignItems: 'center',
  },
  description: {
    width: '90%',
    padding: 5,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 21,
  },
  tagBox: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  nameTag: {
    marginTop: 10,
    marginRight: 5,
    width: 45,
    height: 25,
    justifyContent: 'center',
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 2,
    marginTop: 10,
    // marginLeft: 12,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 13,
  },
  priceTag: {
    marginRight: 10,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTagActive: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    backgroundColor: '#FF533A',
    borderRadius: 2,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeBox: {
    flexDirection: 'row',
    marginTop: 40,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
