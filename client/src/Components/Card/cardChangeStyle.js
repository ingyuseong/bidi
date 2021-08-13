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
        nextButton={<Icon name="chevron-right" size={30} color="#FF533A"></Icon>}
        prevButton={<Icon name="chevron-left" size={30} color="#0A0A32"></Icon>}>
        <View style={styles.styleContainer}>
          <ImageModal
            resizeMode={'contain'}
            style={styles.styleImg}
            source={{
              uri: before_src,
            }}
          />
          <View style={{ ...styles.textArea, backgroundColor: '#FF533A' }}>
            <Text style={styles.text}>Before</Text>
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
          <View style={{ ...styles.textArea, backgroundColor: '#0A0A32' }}>
            <Text style={styles.text}>After</Text>
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
});

export default CardChangeStyle;
