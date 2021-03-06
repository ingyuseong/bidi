import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

import StyleAPI from '../../../../Api/style';
import { createStyleForm } from '../../../../Lib/utils';
import { getStyleListByDesignerId } from '../../../../Contexts/Designer/Style';
import { LENGTH_TYPE, STYLE_TYPE, GENDER_TYPE } from '../../../../Lib/constant';

import Line from '../../../../Components/Common/line';
import StyleTags from '../../../../Components/StyleBook/styleTags';
import StyleMain from '../../../../Components/StyleBook/styleMain';
import StyleImage from '../../../../Components/StyleBook/styleImage';
import StyleTitle from '../../../../Components/StyleBook/styleTitle';
import StylePrice from '../../../../Components/StyleBook/stylePrice';
import StyleCategory from '../../../../Components/StyleBook/styleCategory';
import StyleDescription from '../../../../Components/StyleBook/styleDescription';

function EditStyleBookScreen({ navigation, route }) {
  const { styleItem } = route.params;
  const { data: userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [frontStyle, setFrontStyle] = useState(styleItem.front_img_src);
  const [sideStyle, setSideStyle] = useState(styleItem.side_img_src);
  const [backStyle, setBackStyle] = useState(styleItem.back_img_src);
  const [styleTitle, setStyleTitle] = useState(styleItem.title);
  const [styleDescription, setStyleDescription] = useState(styleItem.description);
  const [stylePrice, setStylePrice] = useState(String(styleItem.price));
  const [tagText, setTagText] = useState('');
  const [styleTags, setStyleTags] = useState(styleItem.keyword_array);

  const [genderTypeOpen, setGenderTypeOpen] = useState(false);
  const [genderTypeValue, setGenderTypeValue] = useState(styleItem.gender_type);
  const [genderTypeItems, setGenderTypeItems] = useState(GENDER_TYPE);
  const [lengthTypeOpen, setLengthTypeOpen] = useState(false);
  const [lengthTypeValue, setLengthTypeValue] = useState(styleItem.length_type);
  const [lengthTypeItems, setLengthTypeItems] = useState(LENGTH_TYPE);
  const [styleTypeOpen, setStyleTypeOpen] = useState(false);
  const [styleTypeValue, setStyleTypeValue] = useState(styleItem.style_type);
  const [styleTypeItems, setStyleTypeItems] = useState([]);

  useEffect(() => {
    setStyleTypeItems(STYLE_TYPE[lengthTypeValue]);
  }, [lengthTypeValue]);

  const addStyleTags = () => {
    if (styleTags.length > 2) {
      setTagText('');
      return Alert.alert('????????? ????????? ?????? 3????????? ????????? ???????????????');
    }
    setStyleTags([...styleTags, tagText]);
    setTagText('');
  };

  const deleteStyleTags = (deleteTag) => {
    const filteredStyleTags = styleTags.filter((tag) => tag != deleteTag);
    setStyleTags(filteredStyleTags);
  };

  const editHandler = async () => {
    if (!frontStyle) {
      return Alert.alert('????????? ????????? ??????????????????!');
    }
    if (!styleTitle) {
      return Alert.alert('????????? ????????? ??????????????????!');
    }
    if (!genderTypeValue) {
      return Alert.alert('????????? ??????????????????!');
    }
    if (!styleTypeValue) {
      return Alert.alert('??????????????? ??????????????????!');
    }
    if (!styleTags) {
      return Alert.alert('????????? ????????? ??????????????????!');
    }
    if (!styleDescription) {
      return Alert.alert('???????????? ?????? ?????? ????????? ??????????????????!');
    }
    if (!stylePrice) {
      return Alert.alert('???????????? ????????? ??????????????????!');
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
    const response = await StyleAPI.patchStyle(styleItem.id, bodyData);
    if (response) {
      Alert.alert('???????????? ????????? ?????????????????????!');
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
          isEdit={true}
        />
        <Line />
        <StyleTitle
          title="????????? ??????"
          value={styleTitle}
          setValue={setStyleTitle}
          placeholderMessage="????????? ????????? ??????????????????"
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
          title="????????? ??????"
          subTitle="(?????? 5???)"
          value={tagText}
          setValue={setTagText}
          setStyleTags={setStyleTags}
          placeholderMessage="???????????? ????????? ??????????????? ??????????????????!"
          placeholderColor="#878787"
          returnKeyType="next"
          styleTags={styleTags}
          addStyleTags={addStyleTags}
          deleteStyleTags={deleteStyleTags}
        />
        <StylePrice
          title="??????"
          value={stylePrice}
          setValue={setStylePrice}
          placeholderMessage="0"
          placeholderColor="#878787"
        />
        <TouchableOpacity onPress={editHandler}>
          <View style={styles.bottomBtnArea}>
            <Text style={styles.editBtnText}>????????????</Text>
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
  editBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 22,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});

export default EditStyleBookScreen;
