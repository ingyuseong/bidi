import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import Loading from '../../../Components/Common/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoStyleBookScreen from './noStyleBookScreen';
import { getStyleListByDesignerId } from '../../../Contexts/Style';

function StyleBookListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: userInfo } = useSelector((state) => state.user);
  const {
    data: styleList,
    loading,
    error,
  } = useSelector((state) => state.style) || {
    data: [],
    loading: false,
    error: null,
  };

  useEffect(() => {
    dispatch(getStyleListByDesignerId(userInfo.id));
  }, [dispatch]);

  const detailStyleHandler = (styleItem) => {
    navigation.push('DetailStyleBook', { styleItem });
  };

  if (loading || error) {
    return <Loading loading />;
  }
  if (styleList.length === 0) {
    return <NoStyleBookScreen navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterBox}>
        <View style={styles.filterArea}>
          <Text style={styles.filterText}>여성</Text>
        </View>
        <View style={styles.filterArea}>
          <Text style={styles.filterText}>커트</Text>
        </View>
        <View style={styles.filterArea}>
          <Text style={styles.filterText}>단발 스타일</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.styleBox}>
          {styleList.map((styleItem, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.styleItem}
              key={index}
              onPress={() => detailStyleHandler(styleItem)}>
              <Image
                style={styles.styleImg}
                source={{
                  uri: styleItem.img_src_array[0],
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.push('CreateStyleBook');
        }}>
        <Ionicons name="add" size={50} style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    marginBottom: 8,
  },
  filterArea: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
  },
  filterText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#878787',
    lineHeight: 18,
  },
  styleBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 2,
  },
  styleItem: {
    width: '50%',
    height: 200,
    resizeMode: 'center',
    padding: 2,
  },
  styleImg: {
    width: '100%',
    height: 196,
  },
  addBtn: {
    position: 'absolute',
    width: 65,
    height: 65,
    backgroundColor: '#0A0A32',
    borderRadius: 50,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000', //그림자색
    shadowOpacity: 0.3, //그림자 투명도
    shadowOffset: { width: 2, height: 2 }, //그림자 위치
  },
  addIcon: {
    color: 'white',
  },
});

export default StyleBookListScreen;
