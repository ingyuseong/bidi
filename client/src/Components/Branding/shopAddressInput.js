import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { objectNullChecking } from '../../Lib/utils';

function ShopAddressInput({ navigation, title, shopAddress, setShopAddress, nextTo }) {
  const findAddressHandler = () => {
    navigation.push('FindAddress', { shopAddress, setShopAddress, nextTo });
  };
  return (
    <View style={styles.inputBox}>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.addressBox} onPress={findAddressHandler}>
        <View style={styles.zoneCodeArea}>
          {objectNullChecking(shopAddress) && (
            <Text style={styles.zoneCodeText}>{shopAddress.zoneCode}</Text>
          )}
        </View>
        <View style={styles.findAddressArea}>
          <Text style={styles.findAddressText}>주소 찾기</Text>
        </View>
      </TouchableOpacity>
      {objectNullChecking(shopAddress) && (
        <>
          <View style={styles.addressArea}>
            <Text style={styles.addressText}>{shopAddress.address}</Text>
          </View>
          <TextInput
            style={styles.inputArea}
            value={shopAddress.detailAddress}
            onChangeText={(text) => setShopAddress({ ...shopAddress, detailAddress: text })}
            placeholder="상세 주소를 입력해주세요"
            placeholderTextColor="#878787"
            autoCapitalize="sentences"
            autoCorrect
            maxLength={20}
            returnKeyType="search"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    margin: 16,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    padding: 16,
    paddingTop: 16,
    marginTop: 8,
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
  addressBox: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    height: 50,
    flexDirection: 'row',
  },
  zoneCodeArea: {
    width: '70%',
    padding: 16,
  },
  zoneCodeText: {
    color: 'black',
    fontSize: 15,
  },
  findAddressArea: {
    backgroundColor: '#0A0A32',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    width: '30%',
  },
  findAddressText: {
    color: 'white',
    fontSize: 16,
  },
  addressText: {
    color: 'black',
    fontSize: 15,
  },
  addressArea: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    height: 50,
    padding: 16,
    marginTop: 8,
  },
});

export default ShopAddressInput;
