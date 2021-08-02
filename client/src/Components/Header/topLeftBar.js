import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

function TopLeftBar({ navigation, route }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.replace('MainTab')}>
        <Image source={require('../../../public/img/typo_logo.png')} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  logo: {
    width: 70,
    height: 20,
    resizeMode: 'contain',
  },
});
export default TopLeftBar;
