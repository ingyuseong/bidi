import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

function DesignerStyle({ info }) {
  return (
    <Swiper style={styles.wrapper} showsButtons={true} showsPagination={false} loop={true}>
      <View style={styles.styleContainer}>
        <Image style={styles.styleImg} source={require('../../../public/img/test1.jpeg')} />
      </View>
      <View style={styles.styleContainer}>
        <Image style={styles.styleImg} source={require('../../../public/img/test3.jpeg')} />
      </View>
      <View style={styles.styleContainer}>
        <Image style={styles.styleImg} source={require('../../../public/img/test4.jpeg')} />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  styleContainer: {
    flex: 1.5,
  },
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
  },
});

export default DesignerStyle;
