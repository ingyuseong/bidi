import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

function BidRefStyle({ title, navigation, styleMenuList, setStyleMenuList, nextTo, isEdit }) {
  return (
    <View style={styles.inputBox}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.styleBox}>
        {styleMenuList.map((styleItem, index) => {
          return (
            <View style={styles.styleArea} key={index}>
              <Image
                source={{
                  uri: styleItem.front_img_src,
                }}
                style={styles.styleImg}
              />
            </View>
          );
        })}
        {styleMenuList.length === 0 && isEdit === false && (
          <View>
            <Text style={styles.noRefStyleText}>추천 스타일이 존재하지 않습니다</Text>
          </View>
        )}
        {isEdit && (
          <TouchableOpacity
            style={[styles.styleArea, styles.addStyleArea]}
            onPress={() =>
              navigation.navigate('StyleList', {
                styleMenuList,
                setStyleMenuList,
                nextTo,
              })
            }>
            <Icon name="add" size={50} style={styles.addIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    margin: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
  },

  styleBox: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 16,
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
  noRefStyleText: {
    color: '#111111',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 15,
  },
});

export default BidRefStyle;
