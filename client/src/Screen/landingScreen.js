// Import React and Component
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BidiStorage from '../Lib/storage';
import { STORAGE_KEY } from '../Lib/constant';
import UserAPI from '../Api/user';
import { useDispatch } from 'react-redux';
import { getUser } from '../Contexts/User/action';

const LandingScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchMode() {
      const { token } = await BidiStorage.getData(STORAGE_KEY);
      const user = token ? await UserAPI.checkToken(token) : '';
      if (user) {
        await dispatch(getUser(user));
        setTimeout(() => {
          setAnimating(false);
          navigation.replace('MainTab');
        }, 2000);
      } else {
        setTimeout(() => {
          setAnimating(false);
          navigation.replace('Auth');
        }, 2000);
      }
    }
    fetchMode();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/img/landing_logo.png')}
        style={{ width: wp(55), resizeMode: 'contain', margin: 20 }}
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
