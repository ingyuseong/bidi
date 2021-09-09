import React from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity, ScrollView, Image } from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { objectNullChecking } from '../../Lib/utils';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function StyleImage({
  frontStyle,
  setFrontStyle,
  sideStyle,
  setSideStyle,
  backStyle,
  setBackStyle,
  isEdit,
}) {
  const addStyleHandler = (setStyle) => {
    launchImageLibrary({ nodata: true }, (response) => {
      if (response.didCancel) {
        return Alert.alert('선택을 취소하였습니다');
      } else {
        setStyle(response.assets[0]);
      }
    });
  };
  const removeStyleHandler = (setStyle) => {
    setStyle({});
  };

  return (
    <View style={styles.styleBox}>
      <View style={styles.styleArea}>
        <Text style={styles.titleText}>정면 사진</Text>
        <TouchableOpacity onPress={() => addStyleHandler(setFrontStyle)}>
          <View style={styles.styleImageArea}>
            {objectNullChecking(frontStyle) ? (
              <>
                <Image
                  source={{ uri: frontStyle.uri ? frontStyle.uri : frontStyle }}
                  style={styles.styleImg}
                />
                <TouchableOpacity
                  style={styles.removeStyleArea}
                  onPress={() => removeStyleHandler(setFrontStyle)}>
                  <IoniconsIcon name="close" size={20} style={styles.removeStyleBtn} />
                </TouchableOpacity>
              </>
            ) : (
              <FontAwesomeIcon name="camera" size={25} style={styles.addStyleBtn} />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.styleArea}>
        <Text style={styles.titleText}>측면 사진</Text>
        <TouchableOpacity onPress={() => addStyleHandler(setSideStyle)}>
          <View style={styles.styleImageArea}>
            {objectNullChecking(sideStyle) ? (
              <>
                <Image
                  source={{ uri: sideStyle.uri ? sideStyle.uri : sideStyle }}
                  style={styles.styleImg}
                />
                <TouchableOpacity
                  style={styles.removeStyleArea}
                  onPress={() => removeStyleHandler(setSideStyle)}>
                  <IoniconsIcon name="close" size={20} style={styles.removeStyleBtn} />
                </TouchableOpacity>
              </>
            ) : (
              <FontAwesomeIcon name="camera" size={25} style={styles.addStyleBtn} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.styleArea}>
        <Text style={styles.titleText}>후면 사진</Text>
        <TouchableOpacity onPress={() => addStyleHandler(setBackStyle)}>
          <View style={styles.styleImageArea}>
            {objectNullChecking(backStyle) ? (
              <>
                <Image
                  source={{ uri: backStyle.uri ? backStyle.uri : backStyle }}
                  style={styles.styleImg}
                />
                <TouchableOpacity
                  style={styles.removeStyleArea}
                  onPress={() => removeStyleHandler(setBackStyle)}>
                  <IoniconsIcon name="close" size={20} style={styles.removeStyleBtn} />
                </TouchableOpacity>
              </>
            ) : (
              <FontAwesomeIcon name="camera" size={25} style={styles.addStyleBtn} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  styleBox: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    justifyContent: 'space-around',
  },
  styleArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  styleImageArea: {
    width: 90,
    height: 90,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addStyleBtn: {
    color: 'gray',
  },
  styleCountArea: {
    flexDirection: 'row',
  },
  styleCountText: {
    color: 'gray',
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '500',
  },
  styleCurrentCountText: {
    color: '#FF533A',
  },
  styleImg: { width: '100%', height: 90 },
  removeStyleArea: {
    position: 'absolute',
    width: 22,
    height: 22,
    backgroundColor: '#8D8D8D',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: -9,
    top: -9,
  },
  removeStyleBtn: {
    color: 'white',
  },
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 15,
  },
});

export default StyleImage;
