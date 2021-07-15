// Import React and Component
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BidiStorage from '../Lib/storage';
import { STORAGE_KEY } from '../Lib/constant';

const LandingScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      BidiStorage.getData(STORAGE_KEY).then((value) => {
        navigation.replace(value == '' ? 'Auth' : 'MainTab');
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/img/landing_logo.png')}
        style={{ width: wp(55), resizeMode: 'contain', margin: 60 }}
      />
      <ActivityIndicator
        animating={animating}
        color=""
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 60,
  },
});
