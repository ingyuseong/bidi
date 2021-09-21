import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';

function CardStyle({ styleLists, isUser, height }) {
  return (
    <View style={{ ...styles.container, height }}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        showsPagination={false}
        loop={false}
        nextButton={<Icon name="right" size={30} color="white"></Icon>}
        prevButton={<Icon name="left" size={30} color="white"></Icon>}>
        {styleLists.map((item, index) => (
          <View style={styles.styleContainer} key={index}>
            <Image
              style={styles.styleImg}
              source={{
                uri: isUser ? item.front_img_src : item,
              }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 2 },
  wrapper: {},
  styleContainer: {
    position: 'relative',
  },

  styleImg: {
    resizeMode: 'cover',
    width: '100%',
    height: 400,
  },
});

export default CardStyle;
