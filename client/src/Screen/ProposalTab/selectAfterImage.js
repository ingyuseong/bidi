import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TextInput } from 'react-native';

function SelectAfterImageScreen({ navigation, route }) {
  const { setAfterImageStyle } = route.params

  const goBack = async (e) => {
    navigation.goBack();
  }
  const selectAlbum = async (e) => {
    navigation.navigate('SelectFromAlbum', {setAfterImageStyle: setAfterImageStyle});
  }
  const selectScrap = async (e) => {
    navigation.navigate('SelectFromScrap', {setAfterImageStyle: setAfterImageStyle});
  }
  const selectBidi = async (e) => {
    navigation.navigate('SelectFromBidi', {setAfterImageStyle: setAfterImageStyle});
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
          <Image
            style={styles.image}
            source={require('../../../public/img/proposal_after_image.png')}
          />
      </View>
      <View style={styles.selectBox}>
        <View style={{margin: 20, marginBottom: 0}}> 
          <Text style={styles.title}>원하는 After 헤어사진을</Text>
          <Text style={styles.title}>등록해주세요!</Text>
        </View>
        <View style={{marginTop: 20}}>
          <TouchableHighlight  underlayColor='white' style={styles.keywordNormal} onPress={selectAlbum}>
            <Text style={styles.keywordTextNormal}>
              📸  앨범에서 가져오기
            </Text>
          </TouchableHighlight>
          <TouchableHighlight  underlayColor='white' style={styles.keywordNormal} onPress={selectScrap}>
            <Text style={styles.keywordTextNormal}>
              💖  비디 스크랩북에서 가져오기
            </Text>
          </TouchableHighlight>
          <TouchableHighlight  underlayColor='white' style={styles.keywordNormal} onPress={selectBidi}>
            <Text style={styles.keywordTextNormal}>
              💫  AI로 새로운 스타일 시도해보기 with 비디
            </Text>
          </TouchableHighlight>
        </View>
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
  content: {
    width:'100%',
  },
  image: {
    width: '100%',
    height:'90%',
  },
  selectBox: {
    alignContent: 'center',
    position: 'absolute',
    bottom: 0,
    width:'100%',
    height:'60%',
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 20
  },
  title: {
    fontSize: 27,
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

export default SelectAfterImageScreen;
