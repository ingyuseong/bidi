import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function DesignerHistoryScreen({ info }) {
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.flex}>
          <Text style={styles.hasReview}>이 디자이너의 매칭내역</Text>
          <Text style={[styles.hasReview, styles.countReview]}>6</Text>
        </View>
        <View style={styles.selectContainer}>
          <View style={styles.select}>
            <Text>최신순</Text>
          </View>
          <View style={styles.select}>
            <Text>평점순</Text>
          </View>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Image style={styles.reviewImg} source={require('../../../../public/img/test3.jpeg')} />
            <View style={styles.reviewBox}>
              <View style={styles.reviewer}>
                <Text style={styles.reviewName}>kang***</Text>
                <Text style={styles.reviewDate}>2021.06.21</Text>
              </View>
              <View style={styles.reviewer}>
                <Text style={styles.reviewGrade}>⭐️⭐️⭐️⭐️ 4.0</Text>
              </View>
            </View>
          </View>
          <View style={styles.reviewTag}>
            <View style={styles.tag}>
              <Text>#칼단발 선호</Text>
            </View>
            <View style={styles.tag}>
              <Text>#칼단발 선호</Text>
            </View>
            <View style={styles.tag}>
              <Text>#칼단발 선호</Text>
            </View>
          </View>
          <View style={styles.reviewTile}>
            <Text style={styles.bold}>단발 물결 드라이</Text>
          </View>
          <View style={styles.reviewDetail}>
            <Text>
              친절하고 좋았어요. 시술 끝나고 손질방법도 알려주셔서 관리하기도 편하네요. 가격대비
              완전 만족!
            </Text>
          </View>
        </View>
        <View style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Image style={styles.reviewImg} source={require('../../../../public/img/test3.jpeg')} />
            <View style={styles.reviewBox}>
              <View style={styles.reviewer}>
                <Text style={styles.reviewName}>kang***</Text>
                <Text style={styles.reviewDate}>2021.06.21</Text>
              </View>
              <View style={styles.reviewer}>
                <Text style={styles.reviewGrade}>⭐️⭐️⭐️⭐️ 4.0</Text>
              </View>
            </View>
          </View>
          <View style={styles.reviewTag}>
            <View style={styles.tag}>
              <Text>#칼단발 선호</Text>
            </View>
            <View style={styles.tag}>
              <Text>#칼단발 선호</Text>
            </View>
            <View style={styles.tag}>
              <Text>#칼단발 선호</Text>
            </View>
          </View>
          <View style={styles.reviewTile}>
            <Text style={styles.bold}>단발 물결 드라이</Text>
          </View>
          <View style={styles.reviewDetail}>
            <Text>
              친절하고 좋았어요. 시술 끝나고 손질방법도 알려주셔서 관리하기도 편하네요. 가격대비
              완전 만족!
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 30,
  },
  flex: {
    flexDirection: 'row',
  },
  hasReview: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  countReview: {
    marginLeft: 10,
    color: '#FF3F00',
  },
  selectContainer: {
    flexDirection: 'row',
  },
  select: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
  },
  reviewItem: {
    marginBottom: 40,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewImg: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  reviewName: {
    fontSize: 17,
    marginBottom: 10,
    marginRight: 20,
    fontWeight: 'bold',
  },
  reviewBox: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  reviewDate: {},
  reviewer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewGrade: {
    marginRight: 10,
  },
  reviewTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewTile: {
    marginTop: 15,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DesignerHistoryScreen;
