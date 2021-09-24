import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import BidiStorage from '../../../Lib/storage';
import Line from '../../../Components/Common/line';
import { LOCATION_STORAGE_KEY, CURRENT_LOCATION_STORAGE_KEY } from '../../../Lib/constant';

function AddressSettingScreen({ navigation, route }) {
  const { location, setLocation } = route.params;
  const [recentLocationList, setRecentLocationList] = useState([]);

  const findAddressHandler = () => {
    navigation.navigate('FindAddress', {
      location,
      setLocation,
      recentLocationList,
      setRecentLocationList,
    });
  };

  const locationHandler = async (address) => {
    setLocation(address);
    await BidiStorage.storeData(CURRENT_LOCATION_STORAGE_KEY, address);
    navigation.navigate('DesignerList');
  };
  const deleteLocationHandler = async (address) => {
    const filteredList = recentLocationList.filter((location) => address !== location);
    setRecentLocationList(filteredList);
    await BidiStorage.storeData(LOCATION_STORAGE_KEY, filteredList);
  };

  useEffect(() => {
    const fetchMode = async () => {
      const locationList = (await BidiStorage.getData(LOCATION_STORAGE_KEY)) || [];
      setRecentLocationList(locationList);
    };
    fetchMode();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.findAddressArea} onPress={findAddressHandler}>
        <Icon name="search" size={18} style={styles.searchIcon} />
        <Text style={styles.searchText}>도로명, 건물명 또는 지번으로 검색</Text>
      </TouchableOpacity>
      <Line />
      <View style={styles.addressListBox}>
        <View style={styles.currentAddressArea}>
          <Icon name="locate" size={20} style={styles.locateIcon} />
          <Text style={styles.currentAddressText}>현재 위치로 주소 찾기</Text>
        </View>
        <ScrollView style={styles.addressListArea}>
          <View style={styles.recentArea}>
            <Text style={styles.recentText}>최근 주소</Text>
          </View>
          {recentLocationList &&
            recentLocationList.map((recentLocation, index) =>
              recentLocation === location ? (
                <View style={styles.addressItem} key={index}>
                  <Icon name="location-outline" size={20} style={styles.locationIcon} />
                  <View style={styles.textArea}>
                    <Text style={styles.addressTitleText}>{recentLocation}</Text>
                  </View>
                  <Icon name="checkmark-sharp" size={20} style={styles.checkIcon} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addressItem}
                  key={index}
                  onPress={() => locationHandler(recentLocation)}>
                  <Icon name="location-outline" size={20} style={styles.locationIcon} />
                  <View style={styles.textArea}>
                    <Text style={styles.addressTitleText}>{recentLocation}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteLocationHandler(recentLocation)}>
                    <Icon name="close" size={20} style={styles.closeIcon} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ),
            )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  findAddressArea: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    color: '#878787',
    fontSize: 16,
  },
  locateIcon: {
    marginRight: 8,
  },
  currentAddressArea: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
  },
  currentAddressText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  addressListBox: {
    margin: 16,
  },
  addressListArea: {
    marginTop: 24,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    paddingBottom: 16,
  },
  textArea: {
    flex: 1,
    marginLeft: 16,
  },
  addressTitleText: {
    color: '#111111',
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  addressText: {
    color: '#878787',
    fontSize: 14,
    lineHeight: 17,
  },
  closeIcon: {
    color: '#878787',
  },
  recentArea: {
    marginBottom: 24,
  },
  recentText: {
    color: '#878787',
    fontSize: 16,
    lineHeight: 17,
  },
  checkIcon: {
    color: '#FF533A',
  },
});

export default AddressSettingScreen;
