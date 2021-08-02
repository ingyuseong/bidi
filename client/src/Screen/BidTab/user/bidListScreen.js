import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import DesignerInfo from '../../../Components/Designer/designerInfo';
import RecommendStyle from '../../../Components/Designer/recommendStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

const infoLists = [
  {
    description:
      '설현 고객님 안녕하세요! 디자이너 수아입니다^^ \n고객님 헤어스타일을 보니 단발을 원하시는 것 같아요! \n\n정확한 진단은 고객님 모발을 봐야 알겠지만 말씀대로라면 다행히 지금 모발 손상이 크지 않아 컷트와 펌 동시에 진행이 가능할 것 같습니다 자세한..',
    distance: '1km',
    id: 7,
    img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/ref/female/female_style12.jpg',
    keywords: ['친절', '뱅헤어', '루미네이트 펌', '극손상 케어 전문'],
    name: '수아',
    shopName: '이너프헤어',
    styles: [
      {
        gender: '남성',
        id: 10,
        img_src:
          'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/ref/female/female_style10.jpg',
        price: 15000,
        subtitle: '트렌디한 느낌을 갖고 싶다면 신청하세요!',
        title: '단발컷',
      },
      {
        gender: '여성',
        id: 11,
        img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/test10.jpeg',
        price: 150000,
        subtitle: '자세한 사항은 DM 문의주세요',
        title: '연예인 머리 셋팅펌',
      },
    ],
    userId: 42,
  },
  {
    description:
      '사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다',
    distance: '1km',
    id: 7,
    img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/profile4.jpeg',
    keywords: ['친절'],
    name: '테스트3',
    shopName: '뷰티 헤어숍',
    styles: [
      {
        gender: '남성',
        id: 10,
        img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/test9.jpeg',
        price: 15000,
        subtitle: '트렌디한 느낌을 갖고 싶다면 신청하세요!',
        title: '단발컷',
      },
      {
        gender: '여성',
        id: 11,
        img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/test10.jpeg',
        price: 150000,
        subtitle: '자세한 사항은 DM 문의주세요',
        title: '연예인 머리 셋팅펌',
      },
    ],
    userId: 42,
  },
  {
    description:
      '사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다 사진보다 더 진짜같이 해드리겠습니다',
    distance: '1km',
    id: 7,
    img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/profile4.jpeg',
    keywords: ['친절'],
    name: '테스트3',
    shopName: '뷰티 헤어숍',
    styles: [
      {
        gender: '남성',
        id: 10,
        img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/test9.jpeg',
        price: 15000,
        subtitle: '트렌디한 느낌을 갖고 싶다면 신청하세요!',
        title: '단발컷',
      },
      {
        gender: '여성',
        id: 11,
        img_src: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/test10.jpeg',
        price: 150000,
        subtitle: '자세한 사항은 DM 문의주세요',
        title: '연예인 머리 셋팅펌',
      },
    ],
    userId: 42,
  },
];
function BidListScreen() {
  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {infoLists.map((info, index) => (
        <View style={styles.container} key={index}>
          <View style={styles.styleContainer}>
            <DesignerInfo info={info} />
            <RecommendStyle />
          </View>
          <View style={styles.submitBox}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.submitButton, width: '50%' }}
              onPress={() => console.log('거절햇어')}>
              <Text style={{ ...styles.submitText }}>거절하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.submitButton,
                backgroundColor: '#FF533A',
                borderColor: '#FF533A',
                width: '50%',
              }}
              onPress={() => console.log('수락했네')}>
              <Text style={{ ...styles.submitText, color: 'white' }}>수락하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  styleContainer: {
    marginTop: 20,
    width: '90%',
    height: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  submitBox: {
    position: 'absolute',
    bottom: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    height: 70,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    borderColor: 'rgb(214,214,214)',
    borderTopWidth: 1,
  },
  submitText: {
    color: 'grey',
    fontSize: 18,
  },
});

export default BidListScreen;
