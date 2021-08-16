import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import ImageModal from 'react-native-image-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

function CardChangeStyle({ before_src, after_src, height }) {
  return (
    <View style={{ ...styles.container }}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        showsPagination={false}
        loop={false}
        nextButton={<Icon name="chevron-right" size={20} color="grey"></Icon>}
        prevButton={<Icon name="chevron-left" size={20} color="grey"></Icon>}>
        <View style={styles.styleContainer}>
          <ImageModal
            resizeMode={'contain'}
            style={styles.styleImg}
            source={{
              uri: before_src,
            }}
          />
          <View style={styles.statusBar}>
            <View style={{ width: 60, height: 5, backgroundColor: '#0A0A32' }}></View>
            <View style={{ width: 60, height: 5, backgroundColor: 'white' }}></View>
          </View>
        </View>
        <View style={styles.styleContainer}>
          <ImageModal
            resizeMode={'contain'}
            style={styles.styleImg}
            source={{
              uri: after_src,
            }}
          />
          <View style={styles.statusBar}>
            <View style={{ width: 60, height: 5, backgroundColor: 'white' }}></View>
            <View style={{ width: 60, height: 5, backgroundColor: '#0A0A32' }}></View>
          </View>
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1.5 },
  wrapper: {},
  styleContainer: {
    position: 'relative',
  },

  styleImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  textArea: {
    backgroundColor: '#FF533A',
    width: 100,
    height: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    lineHeight: 21,
  },
  statusBar: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    flexDirection: 'row',
  },
});

export default CardChangeStyle;
