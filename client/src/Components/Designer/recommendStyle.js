import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

function RecommendStyle() {
  return (
    <View style={styles.styleListContainer}>
      <Text style={styles.titleText}>추천 스타일</Text>
      <ScrollView horizontal={true}>
        <View style={styles.styleArea}>
          <Image source={require('../../../public/img/test1.jpeg')} style={styles.styleImg} />
          <Image source={require('../../../public/img/test2.jpeg')} style={styles.styleImg} />
          <Image source={require('../../../public/img/test3.jpeg')} style={styles.styleImg} />
          <Image source={require('../../../public/img/test4.jpeg')} style={styles.styleImg} />
          <Image source={require('../../../public/img/test1.jpeg')} style={styles.styleImg} />
          <Image source={require('../../../public/img/test2.jpeg')} style={styles.styleImg} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  styleListContainer: {
    margin: 15,
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
