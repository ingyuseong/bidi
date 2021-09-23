import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Postcode from '@actbase/react-daum-postcode';

import BidiStorage from '../../../Lib/storage';
import { LOCATION_STORAGE_KEY, CURRENT_LOCATION_STORAGE_KEY } from '../../../Lib/constant';

function FindAddressScreen({ navigation, route }) {
  const { location, setLocation, recentLocationList, setRecentLocationList } = route.params;

  return (
    <Postcode
      style={styles.container}
      jsOptions={{ animation: true, hideMapBtn: true }}
      onSelected={async (data) => {
        setRecentLocationList([...recentLocationList, data.address]);
        setLocation(data.address);
        await BidiStorage.storeData(LOCATION_STORAGE_KEY, [...recentLocationList, data.address]);
        await BidiStorage.storeData(CURRENT_LOCATION_STORAGE_KEY, data.address);
        navigation.navigate('DesignerList');
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
