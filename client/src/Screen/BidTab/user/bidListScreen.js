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
          <ScrollView style={styles.styleContainer}>
            <DesignerInfo info={info} />
            <RecommendStyle />
          </ScrollView>
          <TouchableOpacity style={styles.moreBtnArea}>
            <Icon name="angle-double-down" size={25} style={styles.icon} />
            <Text style={styles.moreBtnText}>포트폴리오 더보기</Text>
          </TouchableOpacity>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
  },
  styleContainer: {
    margin: 10,
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  moreBtnArea: {
    borderWidth: 1,
    backgroundColor: 'navy',
    padding: 15,
    marginBottom: 20,
    borderRadius: 50,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    color: 'white',
    marginRight: 10,
  },
});

export default BidListScreen;
