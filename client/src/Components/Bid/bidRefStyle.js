import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function BidRefStyle() {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>추천 스타일</Text>
      </View>
      <View style={styles.styleContainer}>
        <TouchableOpacity style={styles.styleArea}>
          <Image
            source={{ uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/tes1.jpeg' }}
            style={styles.styleImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.styleArea}>
          <Image
            source={{ uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/test7.jpeg' }}
            style={styles.styleImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.styleArea, styles.addStyleArea]}>
          <Icon name="add" size={50} style={styles.addIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.styleArea}></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

  styleContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  styleArea: {
    width: 168,
    height: 168,
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStyleArea: {
    backgroundColor: '#DDDDDD',
  },
  styleImg: {
    width: 168,
    height: 168,
    resizeMode: 'cover',
    borderRadius: 3,
  },
  addIcon: {
    color: '#fff',
  },
});

export default BidRefStyle;
