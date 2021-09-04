import React from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity, ScrollView, Image } from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function StyleImage({ styleArray, setStyleArray }) {
  const addStyleHandler = () => {
    launchImageLibrary({ nodata: true }, (response) => {
      if (response.didCancel) {
        return Alert.alert('선택을 취소하였습니다');
      } else {
        setStyleArray([...styleArray, response.assets[0]]);
      }
    });
  };
  const removeStyleHandler = (targetStyle) => {
    const newStyleArray = styleArray.filter((style) => style.fileName !== targetStyle.fileName);
    setStyleArray(newStyleArray);
  };

  return (
    <View style={styles.styleBox}>
      <TouchableOpacity onPress={addStyleHandler}>
        <View style={styles.addStyleArea}>
          <FontAwesomeIcon name="camera" size={25} style={styles.addStyleBtn} />
          <View style={styles.styleCountArea}>
            <Text style={[styles.styleCountText, styles.styleCurrentCountText]}>
              {styleArray.length}
            </Text>
            <Text style={styles.styleCountText}>/10</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView horizontal={true}>
        {styleArray.length > 0 &&
          styleArray.map((style, index) => (
            <View style={styles.styleArea} key={index}>
              <Image source={{ uri: style.uri }} style={styles.styleImg} />
              <TouchableOpacity
                style={styles.removeStyleArea}
                onPress={() => removeStyleHandler(style)}>
                <IoniconsIcon name="close" size={20} style={styles.removeStyleBtn} />
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  styleBox: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
  },
  addStyleArea: {
    width: 90,
    height: 90,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 16,
  },
  addStyleBtn: {
    color: 'gray',
    marginBottom: 8,
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
  styleArea: {
    width: 90,
    height: 90,
    resizeMode: 'center',
    marginRight: 8,
    position: 'relative',
    marginTop: 16,
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
});

export default StyleImage;
