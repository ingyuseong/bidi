import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

function AddressBar({ navigation, route }) {
  const [location, setLocation] = useState('주소를 설정해주세요');

  return (
    <TouchableOpacity
      style={styles.addressArea}
      onPress={() => navigation.navigate('AddressSetting', { location, setLocation })}>
      <Icon name="location-outline" size={20} style={styles.locationIcon} />
      <Text style={styles.addressText}>{location}</Text>
      <Icon name="chevron-down-outline" size={20} style={styles.downIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addressArea: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  addressText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 18,
  },
  locationIcon: {
    marginRight: 8,
  },
  downIcon: {
    marginLeft: 8,
  },
});

export default AddressBar;
