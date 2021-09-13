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

// Components
import BottomButton from '../../../../Components/Common/bottomButton';

// API
import MatchingAPI from '../../../../Api/matching';

// Redux Action
import { deleteMatching } from '../../../../Contexts/Matching/action';

function ReservationScreen({ navigation }) {
  const { data: matching } = useSelector((state) => state.customerMatching);
  const [styleUri, setStyleUrl] = useState('none');
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
  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>스타일 선택</Text>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.imageBox}>
              {styleUri == 'none' ? (
                <View style={styles.image}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.imageLabel}>스타일 선택하기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity activeOpacity={0.8} style={styles.imageAfter}>
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{
                      uri: styleUri,
                    }}
                  />
                </TouchableOpacity>
              )}
              <View style={{ ...styles.imageTypeLabel, backgroundColor: 'rgb(11,14,43)' }}>
                <Text style={styles.imageTypeLabelText}>Style</Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.titleBox}>
            <Text style={styles.title}>제안 키워드</Text>
          </View>
          <View style={styles.tagBox}>
            {matching.proposal.keyword_array && matching.proposal.keyword_array.length > 0 ? (
              matching.proposal.keyword_array.map((item, index) => (
                <View style={styles.tag} key={index}>
                  <Text style={{ color: '#8D8D8D', fontWeight: '600' }}>{item}</Text>
                </View>
              ))
            ) : (
              <View style={styles.tag}>
                <Text style={{ color: '#8D8D8D' }}>키워드 없음</Text>
              </View>
            )}
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>비드 키워드</Text>
          </View>
          <View style={styles.tagBox}>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}>{matching.bid.length_type}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}>{matching.bid.style_type}</Text>
            </View>
          </View> */}
          <View style={styles.titleBox}>
            <Text style={styles.title}>스타일링 시간 선택</Text>
          </View>
          <View style={styles.tagBox}>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}>10:30</Text>
            </View>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}>11:00</Text>
            </View>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}>11:30</Text>
            </View>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}>12:00</Text>
            </View>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}>12:30</Text>
            </View>
          </View>
          <View style={{ marginTop: 80 }}></View>
        </ScrollView>
      </View>
      <BottomButton
        leftName="취소하기"
        rightName="예약완료"
        leftRatio={50}
        leftHandler={deleteAlert}
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
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  locationInput: {
    width: '90%',
    height: 42,
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: 'rgb(243,243,243)',
    padding: 10,
    zIndex: 2,
  },
});

export default ReservationScreen;
