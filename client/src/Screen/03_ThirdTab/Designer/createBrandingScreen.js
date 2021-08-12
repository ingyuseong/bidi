import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';
import BrandingInput from '../../../Components/Branding/brandingInput';

function CreateBrandingScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState();

  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [position, setPosition] = useState('');
  const [brandingName, setBrandingName] = useState('');
  const [description, setDesciption] = useState('');
  const [tagText, setTagText] = useState('');
  const [styleTags, setStyleTags] = useState([]);
  const [styleList, setStyleList] = useState('');

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
        address: shopAddress,
        position: position,
        title: brandingName,
        keywords: styleTags.toString(),
        main: 0,
        authentication: 0,
        styles: [1, 2, 3],
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          Alert.alert('포트폴리오 작성이 성공적으로 완료되었습니다!');
          navigation.push('BrandingMain');
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
      <BrandingInput
        title="헤어샵"
        value={shopName}
        setValue={setShopName}
        placeholderMessage="근무중인 헤어샵을 입력해주세요"
        placeholderColor="#878787"
      />
      <BrandingInput
        title="헤어샵 위치"
        value={shopAddress}
        setValue={setShopAddress}
        placeholderMessage="서울특별시 강남구"
        placeholderColor="#878787"
      />
      <BrandingInput
        title="직급"
        value={position}
        setValue={setPosition}
        placeholderMessage="직급을 입력해주세요"
        placeholderColor="#878787"
      />
      <View style={styles.line}></View>
      <BrandingInput
        title="포트폴리오 이름"
        value={brandingName}
        setValue={setBrandingName}
        placeholderMessage="고객님에게는 노출되지 않는 비공개 메모입니다"
        placeholderColor="#FF533A"
      />
      <BrandingInput
        title="스타일 태그"
        subTitle="(최대 5개)"
        value={tagText}
        setValue={setTagText}
        setStyleTags={setStyleTags}
        placeholderMessage="스타일을 검색하세요"
        placeholderColor="#878787"
        returnKeyType="next"
        styleTags={styleTags}
        addStyleTags={addStyleTags}
        deleteStyleTags={deleteStyleTags}
      />
      <BrandingInput
        title="상세 설명"
        value={description}
        setValue={setDesciption}
        placeholderMessage="고객님들에게 나를 가장 잘 표현할 수 있는 자기소개를 적어주세요! 자세하게 작성할수록 비드 매칭 확률이 올라갑니다 (최대 400자)"
        placeholderColor="#878787"
        height={167}
        multiline={true}
      />
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
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  titleTextArea: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
