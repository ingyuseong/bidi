import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, TextInput } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function SelectFromAlbumScreen({ navigation, route }) {
  const { setAfterImageStyle } = route.params
  const [Image, setImage] = useState('profile')
  const goBack = async (e) => {
    navigation.goBack();
  }
  const submit = async (e) => {
    setAfterImageStyle('style1')
    navigation.navigate('CreateProposal');
  }

  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      console.log('>>', response.assets[0].uri);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>앨범에서 가져오기</Text>
      </View>
      <Button title="Choose Photo" onPress={handleChoosePhoto}/>

      <View style={styles.backButtonBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
          <Text style={styles.backButton}>돌아가기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.backButtonBox}>
        <TouchableOpacity activeOpacity={0.8} onPress={submit}>
          <Text style={styles.backButton}>등록</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '90%',
    borderColor: 'rgb(243,243,243)',
    borderWidth: 1,
    backgroundColor: 'rgb(243,243,243)'
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

export default SelectFromAlbumScreen;
