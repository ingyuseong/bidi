import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

function SelectFromBidiScreen({ navigation, route }) {
  const { setAfterImageStyle } = route.params

  const goBack = async (e) => {
    navigation.goBack();
  }
  const selectAlbum = async (e) => {
    navigation.navigate('SelectFromAlbum', {setAfterImageStyle: setAfterImageStyle});
  }
  const selectScrap = async (e) => {
    navigation.navigate('SelectFromAlbum', {setAfterImageStyle: setAfterImageStyle});
  }
  const selectBidi = async (e) => {
    navigation.navigate('SelectFromAlbum', {setAfterImageStyle: setAfterImageStyle});
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectBox}>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={{fontSize: 25, marginRight: 10}}>X</Text>
        </TouchableOpacity>
        <Text style={styles.header}>AFTER</Text>
      </View>
      <View style={styles.backButtonBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
          <Text style={styles.backButton}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectBox: {
    flexDirection: 'row',
    padding: 10,
  },
  header: {
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 6
  },
  backButtonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'rgb(11,14,43)'
  },
  backButton: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    width: '50%',
  },
  keywordNormal: {
    justifyContent: 'center',
    borderColor: 'rgb(214,214,214)',
    borderWidth: 1.3,
    borderRadius: 3,
    height: 50,
    marginTop: 10,
    marginRight: 10
  },
  keywordTextNormal: {
    marginLeft: 15,
    fontSize: 15,
    padding: 10,
  }
});

export default SelectFromBidiScreen;
