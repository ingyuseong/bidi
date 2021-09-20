import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { SHOP_EXTRA_INFO_LIST } from '../../Lib/constant';

function ExtraShopInfoInput({ title, subTitle, shopExtraInfoList, setShopExtraInfoList }) {
  const checkHandler = (item) => {
    setShopExtraInfoList([...shopExtraInfoList, item]);
  };
  const checkedHandler = (item) => {
    const filteredList = shopExtraInfoList.filter((info) => {
      return item.id !== info.id;
    });
    setShopExtraInfoList(filteredList);
  };
  console.log(shopExtraInfoList);
  return (
    <View style={styles.inputBox}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subTitleText}>( {subTitle} )</Text>
      </View>
      <View style={styles.extraInfoArea}>
        {SHOP_EXTRA_INFO_LIST.map((item, index) => (
          <View key={index}>
            {shopExtraInfoList.some((checkedItem) => checkedItem.id == item.id) ? (
              <TouchableOpacity
                style={styles.checkedExtraInfoItem}
                key={index}
                onPress={() => checkedHandler(item)}>
                <Text style={styles.checkedExtraInfoText}>{item.value}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.checkExtraInfoItem}
                key={index}
                onPress={() => checkHandler(item)}>
                <Text style={styles.checkExtraInfoText}>{item.value}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    margin: 16,
  },
  titleTextArea: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  subTitleText: {
    fontSize: 14,
    lineHeight: 17,
    marginLeft: 5,
    color: '#878787',
  },
  extraInfoArea: {
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  checkExtraInfoItem: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#DBDBDB',
    padding: 8,
    height: 35,
  },
  checkedExtraInfoItem: {
    borderWidth: 1,
    borderColor: '#0A0A32',
    borderRadius: 3,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#0A0A32',
    padding: 8,
    height: 35,
  },
  checkedExtraInfoText: {
    color: 'white',
  },
  checkExtraInfoText: {},
});

export default ExtraShopInfoInput;
