import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';

function CardStyle({ styleLists }) {
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons={true} showsPagination={false} loop={false}>
        {styleLists.map((item, index) => (
          <View style={styles.styleContainer} key={index}>
            <Image
              style={styles.styleImg}
              source={{
                uri: item.img_src,
              }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: {},
  styleContainer: {},
  styleImg: {
    resizeMode: 'cover',
    width: '100%',
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default CardStyle;
