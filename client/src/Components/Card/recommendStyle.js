import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

function RecommendStyle({ bidStyles }) {
  return (
    <View style={styles.styleListContainer}>
      <Text style={styles.titleText}>추천 스타일</Text>
      <View style={{ width: 100, height: '100%' }}>
        {bidStyles.map((item, index) => {
          <View key={index}>
            <Text>{item.gender}</Text>
          </View>;
        })}
      </View>
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
    height: 90,
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
