import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Postcode from '@actbase/react-daum-postcode';

function FindAddressScreen({ navigation, route }) {
  const { shopAddress, setShopAddress } = route.params;
  return (
    <Postcode
      style={styles.container}
      jsOptions={{ animation: true, hideMapBtn: true }}
      onSelected={(data) => {
        setShopAddress({
          ...shopAddress,
          zoneCode: data.zonecode,
          address: data.address,
          detailAddress: '',
        });
        navigation.navigate('CreateBranding');
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FindAddressScreen;
