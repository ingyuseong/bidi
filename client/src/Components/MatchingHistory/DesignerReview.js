import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';

import { dateFormating, textLimiting } from '../../Lib/utils';

function DesignerReview({ history, type }) {
  const [moreToggle, setMoreToggle] = useState(false);
  return (
    <View style={styles.historyContainer}>
      <View style={styles.designerBox}>
        <Image
          style={styles.designerImg}
          source={
            type == 'customer'
              ? { uri: history.customer.img_src }
              : { uri: history.designer.img_src }
          }
        />
        <View style={styles.designerInfoBox}>
          <View style={styles.designerInfoLine}>
            <Text style={styles.designerName}>
              {type == 'customer' ? history.customer.nick_name : history.designer.nick_name}
            </Text>
            <Text style={styles.historyDate}>{dateFormating(history.created_at)}</Text>
          </View>
          <View style={styles.designerInfoLine}>
            <Stars
              disabled={true}
              half={true}
              default={history.star}
              count={5}
              fullStar={<Icon name="star" style={[styles.myStarStyle]} size={15} />}
              emptyStar={
                <Icon
                  name={'star'}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  size={15}
                />
              }
              halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} size={15} />}
            />
          </View>
        </View>
      </View>
      <View style={styles.tagBox}>
        <View style={styles.tag}>
          <Text style={{ fontSize: 14, color: '#8D8D8D' }}># {history.bid.large_category}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={{ fontSize: 14, color: '#8D8D8D' }}># {history.bid.small_category}</Text>
        </View>
      </View>
      <View>
        {history.review.length < 60 || moreToggle ? (
          <View style={styles.reviewBox}>
            <Text style={styles.reviewText}>{history.review}</Text>
            {history.review.length > 60 && (
              <View style={{ ...styles.moreBtnArea, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
                  <View style={{ ...styles.moreBtn, borderWidth: 0 }}>
                    <Icons name="up" size={17} color="#8D8D8D"></Icons>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={{ ...styles.reviewBox }}>
            <Text style={styles.reviewText}>{textLimiting(history.review, 60)}</Text>
            <View style={styles.moreBtnArea}>
              <TouchableOpacity onPress={() => setMoreToggle(!moreToggle)}>
                <View style={styles.moreBtn}>
                  <Text style={styles.moreBtnText}>더보기</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    padding: 0,
  },

  // Designer Info Box
  designerBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  designerImg: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  designerName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  designerInfoBox: {
    width: '80%',
    marginLeft: 20,
  },
  designerInfoLine: {
    width: '100%',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  myStarStyle: {
    color: '#FF533A',
  },
  myEmptyStarStyle: {
    color: '#DBDBDB',
  },
  designerAddress: {
    marginRight: 10,
    fontWeight: '400',
  },
  historyDate: {
    color: '#878787',
    fontSize: 12,
  },

  // Tag Box
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 5,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#eeeeee',
    marginTop: 10,
    marginRight: 10,
    height: 23,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Review Box
  reviewBox: {
    padding: 10,
  },
  reviewText: {
    lineHeight: 20,
  },
  moreBtnArea: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  moreBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    width: 50,
    height: 25,
  },
  moreBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8D8D8D',
  },
});

export default DesignerReview;
