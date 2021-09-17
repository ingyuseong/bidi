import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from 'react-native';

import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { priceFormating, dateFormating } from '../../Lib/utils';

function StyleModal({ styleItem, setModalVisible }) {
  // state
  const { data: user } = useSelector((state) => state.user);
  // functions
  return (
    <View style={styles.container}>
      <View
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        vertical={true}
        automaticallyAdjustContentInsets={true}>
        <View style={{ height: '55%' }}>
          <Swiper showsButtons={true} showsPagination={false} loop={false}>
            <View style={styles.styleBox}>
              <Image
                style={styles.styleImg}
                source={{
                  uri: styleItem.front_img_src,
                }}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtnArea}>
                <Ionicons name="md-close" size={25} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </Swiper>
        </View>
        <View style={styles.contentBox}>
          <View style={styles.infoArea}>
            <Text style={styles.titleText}>{styleItem.title}</Text>
            <Text style={styles.update}>{dateFormating(styleItem.updated_at)}</Text>
          </View>
          <View style={styles.tagArea}>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}># {styleItem.style_type}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={{ color: '#8D8D8D' }}># {styleItem.length_type}</Text>
            </View>
          </View>
          <View style={styles.subtitleArea}>
            <Text numberOfLines={2} style={styles.subtitleText}>
              {styleItem.description}
            </Text>
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.priceText}>가격</Text>
            <Text style={styles.priceText}>{priceFormating(styleItem.price)} 원</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  contentContainer: { flex: 1 },
  wrapper: { height: '55%' },
  styleImg: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeBtnArea: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  styleScrapIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  contentBox: {
    marginTop: 10,
  },
  infoArea: {
    margin: 15,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  update: {
    fontSize: 12,
    color: '#878787',
  },
  tagArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15,
    marginTop: 0,
  },
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: '#323274',
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: -0.5,
    fontSize: 13,
  },
  subtitleArea: {
    margin: 15,
    marginTop: 5,
  },
  subtitleText: {
    color: '#8D8D8D',
  },
  priceArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  priceText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  deleteArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 15,
  },
  deleteText: {
    color: '#8D8D8D',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default StyleModal;
