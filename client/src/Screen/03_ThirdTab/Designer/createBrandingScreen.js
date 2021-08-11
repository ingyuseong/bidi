import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import BidiStorage from '../../../Lib/storage';
import { DISTANCE_CATEGORY, STORAGE_KEY } from '../../../Lib/constant';

function CreateBrandingScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState();

  const [shopName, setShopName] = useState('');
  const [level, setLevel] = useState('');
  const [brandingName, setBrandingName] = useState('');
  const [description, setDesciption] = useState('');
  const [tagText, setTagText] = useState('');
  const [styleTags, setStyleTags] = useState([]);
  const [styleList, setStyleList] = useState('');

  const [distanceOpen, setDistanceOpen] = useState('');
  const [distanceValue, setDistanceValue] = useState('');
  const [distanceItems, setDistanceItems] = useState(DISTANCE_CATEGORY);

  const addStyleTags = () => {
    if (styleTags.length > 4) {
      setTagText('');
      return Alert.alert('스타일 태그는 최대 5개까지 입력이 가능합니다');
    }
    setStyleTags([...styleTags, tagText]);
    setTagText('');
  };
  const deleteStyleTags = (deleteTag) => {
    const filteredStyleTags = styleTags.filter((tag) => tag != deleteTag);
    setStyleTags(filteredStyleTags);
  };
  const registerHandler = async () => {
    await fetch('http://127.0.0.1:3000' + '/api/branding/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        user_id: userInfo.id,
        description: description,
        shop_name: shopName,
        keywords: styleTags.toString(),
        main: 0,
        styles: [1, 2, 3],
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          console.log(response.data);
          Alert.alert('포트폴리오 작성이 성공적으로 완료되었습니다!');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      setUserInfo(user);
    }
    fetchMode();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>대표 이미지</Text>
        </View>
        <View style={styles.iconArea}>
          <Icon name="camera" size={30} style={styles.cameraIcon} />
          <Text>3/10</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.inputBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>헤어샵</Text>
        </View>
        <TextInput
          style={styles.inputArea}
          value={shopName}
          onChangeText={(text) => setShopName(text)}
          placeholder="근무중인 헤어샵을 입력해주세요"
          placeholderTextColor="#878787"
          autoCapitalize="sentences"
          autoCorrect
          maxLength={20}
          multiline={false}
          blurOnSubmit={true}
          returnKeyType="search"
        />
      </View>
      <View style={styles.inputBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>직급</Text>
        </View>
        <TextInput
          style={styles.inputArea}
          value={level}
          onChangeText={(text) => setLevel(text)}
          placeholder="직급을 입력해주세요"
          placeholderTextColor="#878787"
          autoCapitalize="sentences"
          autoCorrect
          maxLength={20}
          multiline={false}
          returnKeyType="next"
        />
      </View>
      <View style={styles.line}></View>
      <View style={styles.inputBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>포트폴리오 이름</Text>
        </View>
        <TextInput
          style={styles.inputArea}
          value={brandingName}
          onChangeText={(text) => setBrandingName(text)}
          placeholder="고객님에게는 노출되지 않는 비공개 메모입니다"
          placeholderTextColor="#FF533A"
          autoCapitalize="sentences"
          autoCorrect
          maxLength={50}
          multiline={false}
          returnKeyType="next"
        />
      </View>
      <View style={{ ...styles.inputBox, zIndex: 100 }}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>원하는 거리</Text>
        </View>
        <DropDownPicker
          zIndex={1000}
          open={distanceOpen}
          value={distanceValue}
          items={distanceItems}
          setOpen={setDistanceOpen}
          setValue={setDistanceValue}
          setItems={setDistanceItems}
          placeholder="반경 선택하기"
          style={{ ...styles.dropDownArea, height: 42 }}
          dropDownContainerStyle={styles.dropDownArea}
          placeholderStyle={{ color: 'grey', fontSize: 15 }}
          listParentLabelStyle={{ color: 'grey', fontSize: 15 }}
          listMode="SCROLLVIEW"
        />
      </View>
      <View style={styles.inputBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>스타일 태그</Text>
          <Text style={styles.subtitleText}>(최대 5개)</Text>
        </View>
        <TextInput
          style={styles.inputArea}
          value={tagText}
          onChangeText={(text) => setTagText(text)}
          placeholder="스타일을 검색하세요"
          autoCapitalize="sentences"
          autoCorrect
          maxLength={20}
          multiline={false}
          returnKeyType="next"
          onSubmitEditing={addStyleTags}
          addStyleTags
        />
        {styleTags.length > 0 && (
          <View style={styles.styleTagBox}>
            {styleTags.map((tag, index) => (
              <View key={index} style={styles.styleTagArea}>
                <Text style={styles.styleTagText}># {tag}</Text>
                <TouchableOpacity
                  style={styles.deleteIconArea}
                  onPress={() => deleteStyleTags(tag)}>
                  <Icon name="close" size={13} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={styles.inputBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>상세 설명</Text>
        </View>
        <TextInput
          style={styles.descriptionArea}
          value={description}
          onChangeText={(text) => setDesciption(text)}
          placeholder="고객님들에게 나를 가장 잘 표현할 수 있는 자기소개를 적어주세요! 자세하게 작성할수록 비드 매칭 확률이 올라갑니다 (최대 400자)"
          autoCapitalize="sentences"
          autoCorrect
          maxLength={400}
          multiline={true}
          returnKeyType="next"
        />
      </View>
      <View style={styles.inputBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>추천 스타일</Text>
        </View>
        <View style={styles.styleBox}>
          <TouchableOpacity style={styles.styleArea}>
            <Image
              source={{ uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/tes1.jpeg' }}
              style={styles.styleImg}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.styleArea}>
            <Image
              source={{ uri: 'https://bidi-s3.s3.ap-northeast-2.amazonaws.com/test/test7.jpeg' }}
              style={styles.styleImg}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.styleArea, styles.addStyleArea]}>
            <Icon name="add" size={50} style={styles.addIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.styleArea}></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.registerBtnArea} onPress={registerHandler}>
        <Text style={styles.registerBtnText}>저장하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputBox: {
    margin: 16,
  },
  iconArea: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    color: 'gray',
  },
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  subtitleText: {
    fontSize: 14,
    lineHeight: 17,
    marginLeft: 5,
    color: '#111111',
  },
  titleTextArea: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  descriptionArea: {
    height: 167,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  styleTagBox: {
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  styleTagArea: {
    height: 35,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 16,
  },
  styleTagText: {
    color: '#8D8D8D',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.5,
    fontWeight: '500',
  },
  deleteIconArea: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: '#8D8D8D',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: -5,
    top: -5,
  },
  deleteIcon: {
    color: 'white',
  },
  styleBox: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  styleArea: {
    width: 168,
    height: 168,
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStyleArea: {
    backgroundColor: '#DDDDDD',
  },
  styleImg: {
    width: 168,
    height: 168,
    resizeMode: 'cover',
    borderRadius: 3,
  },
  addIcon: {
    color: '#fff',
  },
  dropDownArea: {
    flex: 1,
    borderColor: 'rgb(214,214,214)',
    borderRadius: 3,
    backgroundColor: 'white',
    zIndex: 100,
  },
  line: {
    height: 10,
    backgroundColor: '#f4f4f4',
  },
  registerBtnArea: {
    justifyContent: 'center',
    height: 65,
    backgroundColor: '#0A0A32',
    flex: 1,
  },
  registerBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 22,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});

export default CreateBrandingScreen;
