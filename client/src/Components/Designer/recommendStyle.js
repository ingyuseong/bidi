import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

function RecommendStyle() {
  return (
    <View style={styles.styleListContainer}>
      <Text style={styles.titleText}>추천 스타일</Text>
      <ScrollView horizontal={true}>
        <View style={styles.styleArea}>
          <Image
            source={{
              uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/ref/female/female_style01.jpg',
            }}
            style={styles.styleImg}
          />
          <Image
            source={{
              uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/ref/female/female_style24.jpg',
            }}
            style={styles.styleImg}
          />
          <Image
            source={{
              uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/ref/female/female_style08.jpg',
            }}
            style={styles.styleImg}
          />
          <Image
            source={{
              uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/ref/female/female_style06.jpg',
            }}
            style={styles.styleImg}
          />
          <Image
            source={{
              uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/ref/female/female_style09.jpg',
            }}
            style={styles.styleImg}
          />
          <Image
            source={{
              uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/ref/female/female_style23.jpg',
            }}
            style={styles.styleImg}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  styleListContainer: {
    margin: 15,
    height: 120,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  styleArea: {
    flexDirection: 'row',
    marginTop: 10,
  },
  styleImg: {
    width: 80,
    height: 80,
    resizeMode: 'center',
    marginRight: 10,
  },
});

export default RecommendStyle;
