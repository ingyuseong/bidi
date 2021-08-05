import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function BidItem({ info }) {
  console.log(info);
  return (
    <View style={styles.bidContainer}>
      <View style={styles.bidBox}>
        <View style={styles.bidHeaderArea}>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>2021.7.25</Text>
          </View>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreBtnText}>더보기</Text>
            <Ionicons name="chevron-forward" size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.bidContentArea}>
          <View style={styles.bidProfileArea}>
            <Image
              source={{ uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/tes1.jpeg' }}
              style={styles.bidProfileImg}
            />
          </View>
          <View style={styles.bidInfoArea}>
            <View style={styles.nameArea}>
              <Text style={styles.nameText}>유아인</Text>
            </View>
            <View style={styles.locationArea}>
              <View style={styles.locationView}>
                <Text style={styles.locationText}>성북구 안암동</Text>
              </View>
              <View style={styles.locationView}>
                <Text style={styles.locationText}>4km</Text>
              </View>
            </View>
            <View style={styles.tagArea}>
              <View style={styles.tagView}>
                <Text style={styles.tagText}># 합리적인 가격</Text>
              </View>
              <View style={styles.tagView}>
                <Text style={styles.tagText}># 합리적인 가격</Text>
              </View>
            </View>
            <View style={styles.descriptionArea}>
              <Text style={styles.descriptionText} numberOfLines={2}>
                {info.letter}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bidBox: {
    flex: 1,
    height: 180,
    padding: 16,
  },
  bidHeaderArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidContentArea: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
  },
  dateText: {
    color: '#878787',
    fontSize: 14,
    lineHeight: 17,
  },
  moreBtn: {
    flexDirection: 'row',
  },
  moreBtnText: {
    color: '#0A0A32',
    fontSize: 14,
    lineHeight: 17,
  },
  bidProfileArea: {
    marginRight: 16,
  },
  bidProfileImg: {
    width: 110,
    height: 110,
    resizeMode: 'cover',
  },
  nameArea: {
    marginBottom: 8,
  },
  nameText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
  },
  locationArea: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  locationView: {
    marginRight: 8,
  },
  locationText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
  tagArea: {
    flexDirection: 'row',
  },
  tagView: {
    backgroundColor: '#EEEEEE',
    padding: 5,
    borderRadius: 3,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#8D8D8D',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.5,
    fontWeight: '400',
  },
  descriptionArea: {
    width: '80%',
  },
  descriptionText: {
    color: '#111111',
    fontSize: 10.5,
    lineHeight: 16,
  },

  line: {
    height: 10,
    backgroundColor: '#f4f4f4',
  },
});

export default BidItem;
