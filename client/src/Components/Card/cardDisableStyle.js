import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';

function CardDisableStyle({ styleImage, status }) {
  return (
    <View style={styles.container}>
      <View style={styles.blurArea}>
        <Text style={styles.blurAreaText}>{status === 'done' ? '시술 완료' : '취소 완료'}</Text>
      </View>
      <Image
        style={styles.styleImg}
        source={{
          uri: styleImage,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, height: 400 },
  blurArea: {
    position: 'absolute',
    backgroundColor: 'rgba(17, 17, 17, 0.5);',
    height: 400,
    width: '100%',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  blurAreaText: {
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.5,
    fontWeight: '500',
  },
  styleImg: {
    resizeMode: 'cover',
    width: '100%',
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default CardDisableStyle;
