import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

import StyleAPI from '../../../../Api/style';
import { createStyleForm } from '../../../../Lib/utils';
import { getStyleListByDesignerId } from '../../../../Contexts/Designer/Style';
import { LENGTH_TYPE, STYLE_TYPE, GENDER_TYPE } from '../../../../Lib/constant';

import Line from '../../../../Components/Common/line';
import StyleTags from '../../../../Components/StyleBook/styleTags';
import StyleImage from '../../../../Components/StyleBook/styleImage';
import StyleTitle from '../../../../Components/StyleBook/styleTitle';
import StylePrice from '../../../../Components/StyleBook/stylePrice';
import StyleCategory from '../../../../Components/StyleBook/styleCategory';
import StyleDescription from '../../../../Components/StyleBook/styleDescription';

function CreateStyleBookScreen({ navigation }) {
  const { data: userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [frontStyle, setFrontStyle] = useState({});
  const [sideStyle, setSideStyle] = useState({});
  const [backStyle, setBackStyle] = useState({});
  const [styleTitle, setStyleTitle] = useState('');
  const [styleDescription, setStyleDescription] = useState('');
  const [stylePrice, setStylePrice] = useState('');
  const [tagText, setTagText] = useState('');
  const [styleTags, setStyleTags] = useState([]);

  const [genderTypeOpen, setGenderTypeOpen] = useState(false);
  const [genderTypeValue, setGenderTypeValue] = useState('미선택');
  const [genderTypeItems, setGenderTypeItems] = useState(GENDER_TYPE);
  const [lengthTypeOpen, setLengthTypeOpen] = useState(false);
  const [lengthTypeValue, setLengthTypeValue] = useState('미선택');
  const [lengthTypeItems, setLengthTypeItems] = useState(LENGTH_TYPE);
  const [styleTypeOpen, setStyleTypeOpen] = useState(false);
  const [styleTypeValue, setStyleTypeValue] = useState(null);
  const [styleTypeItems, setStyleTypeItems] = useState([]);

  useEffect(() => {
    setStyleTypeItems(STYLE_TYPE[lengthTypeValue]);
  }, [lengthTypeValue]);

  const addStyleTags = () => {
    if (styleTags.length > 2) {
      setTagText('');
      return Alert.alert('스타일 태그는 최대 3개까지 입력이 가능합니다');
    }
    setStyleTags([...styleTags, tagText]);
    setTagText('');
  };

  const deleteStyleTags = (deleteTag) => {
    const filteredStyleTags = styleTags.filter((tag) => tag != deleteTag);
    setStyleTags(filteredStyleTags);
  };

  const registerHandler = async () => {
    if (!frontStyle) {
      return Alert.alert('스타일 사진을 등록해주세요!');
    }
    if (!styleTitle) {
      return Alert.alert('스타일 이름를 입력해주세요!');
    }
    if (!genderTypeValue) {
      return Alert.alert('성별을 선택해주세요!');
    }
    if (!styleTypeValue) {
      return Alert.alert('카테고리를 선택해주세요!');
    }
    if (!styleTags) {
      return Alert.alert('스타일 태그를 입력해주세요!');
    }
    if (!styleDescription) {
      return Alert.alert('스타일에 대한 상세 설명을 입력해주세요!');
    }
    if (!stylePrice) {
      return Alert.alert('스타일의 가격을 입력해주세요!');
    }
    const bodyData = createStyleForm(frontStyle, sideStyle, backStyle, {
      user_id: userInfo.id,
      title: styleTitle,
      description: styleDescription,
      price: stylePrice,
      gender_type: genderTypeValue,
      style_type: styleTypeValue,
      length_type: lengthTypeValue,
      keyword_array: styleTags.toString(),
    });
    const response = await StyleAPI.registerStyle(bodyData);
    if (response) {
      Alert.alert('스타일북이 작성되었습니다!');
      dispatch(getStyleListByDesignerId(userInfo.id));
      navigation.navigate('BrandingMain', { screen: 'StyleBook' });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StyleImage
          frontStyle={frontStyle}
          setFrontStyle={setFrontStyle}
          sideStyle={sideStyle}
          setSideStyle={setSideStyle}
          backStyle={backStyle}
          setBackStyle={setBackStyle}
          isEdit={false}
        />
        <Line />
        <StyleTitle
          title="스타일 이름"
          value={styleTitle}
          setValue={setStyleTitle}
          placeholderMessage="스타일 이름을 입력해주세요"
          placeholderColor="#878787"
        />
        <StyleCategory
          genderTypeOpen={genderTypeOpen}
          setGenderTypeOpen={setGenderTypeOpen}
          genderTypeValue={genderTypeValue}
          setGenderTypeValue={setGenderTypeValue}
          genderTypeItems={genderTypeItems}
          setGenderTypeItems={setGenderTypeItems}
          lengthTypeOpen={lengthTypeOpen}
          setLengthTypeOpen={setLengthTypeOpen}
          lengthTypeValue={lengthTypeValue}
          setLengthTypeValue={setLengthTypeValue}
          lengthTypeItems={lengthTypeItems}
          setLengthTypeItems={setLengthTypeItems}
          styleTypeOpen={styleTypeOpen}
          setStyleTypeOpen={setStyleTypeOpen}
          styleTypeValue={styleTypeValue}
          setStyleTypeValue={setStyleTypeValue}
          styleTypeItems={styleTypeItems}
          setStyleTypeItems={setStyleTypeItems}
          isEdit={true}
        />
        <StyleDescription
          styleDescription={styleDescription}
          setStyleDescription={setStyleDescription}
          isEdit={true}
        />
        <StyleTags
          title="스타일 태그"
          subTitle="(최대 5개)"
          value={tagText}
          setValue={setTagText}
          setStyleTags={setStyleTags}
          placeholderMessage="스타일에 관련된 키워드들을 입력해주세요!"
          placeholderColor="#878787"
          returnKeyType="next"
          styleTags={styleTags}
          addStyleTags={addStyleTags}
          deleteStyleTags={deleteStyleTags}
        />
        <StylePrice
          title="가격"
          value={stylePrice}
          setValue={setStylePrice}
          placeholderMessage="0"
          placeholderColor="#878787"
        />
        <TouchableOpacity onPress={registerHandler}>
          <View style={styles.bottomBtnArea}>
            <Text style={styles.registerBtnText}>등록하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bottomBtnArea: {
    marginTop: 16,
    backgroundColor: '#0A0A32',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
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

export default CreateStyleBookScreen;
