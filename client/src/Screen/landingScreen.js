// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LandingScreen = ({navigation}) => {
  const [user, setUser] = useState({
    id : '',
    isLogin : true,
  });
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      // navigation.replace(user.isLogin ? 'MainTab' : 'Auth',{'user':user})
      navigation.replace('Auth')
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/img/logo.png')}
        style={{width: wp(55), resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#6990F7"
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
    height: 80,
  },
});