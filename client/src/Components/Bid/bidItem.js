import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertDate } from '../../Lib/utils';

function BidItem({ info }) {
  return (
    <View style={styles.bidContainer}>
      <View style={styles.bidBox}>
        <View style={styles.bidHeaderArea}>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>{convertDate(info.created_at)}</Text>
          </View>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreBtnText}>더보기</Text>
            <Ionicons name="chevron-forward" size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.bidContentArea}>
          <View style={styles.bidProfileArea}>
            <Image source={{ uri: info.proposal.after_src }} style={styles.bidProfileImg} />
          </View>
          <View style={styles.bidInfoArea}>
            <View style={styles.nameArea}>
              <Text style={styles.nameText}>{info.user.name}</Text>
            </View>
            <View style={styles.locationArea}>
              <View style={styles.locationView}>
                <Text style={styles.locationText}>@ {info.user.address}</Text>
              </View>
              <View style={styles.locationView}>
                <Ionicons name="location-outline" size={15} />
                <Text style={styles.locationText}>{info.proposal.distance_limit}</Text>
              </View>
            </View>
            <View style={styles.tagArea}>
              {info?.proposal?.keywords &&
                info.proposal.keywords.split(',').map((keyword, index) => (
                  <View style={styles.tagView} key={index}>
                    <Text style={styles.tagText}># {keyword}</Text>
                  </View>
                ))}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
  tagArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
