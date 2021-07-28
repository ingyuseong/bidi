import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

function DesignerStyle({ styleLists }) {
  return (
    <Swiper style={styles.wrapper} showsButtons={true} showsPagination={false} loop={true}>
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
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  styleContainer: {},
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
  },
});

export default DesignerStyle;
