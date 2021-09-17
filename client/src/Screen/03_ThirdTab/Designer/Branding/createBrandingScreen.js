import React, { useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import BrandingAPI from '../../../../Api/branding';

import Line from '../../../../Components/Common/line';
import Loading from '../../../../Components/Common/loading';
import BrandingInput from '../../../../Components/Branding/brandingInput';
import StyleMenuInput from '../../../../Components/Branding/styleMenuInput';
import ExtraShopInfoInput from '../../../../Components/Branding/extraShopInfoInput';
import { getBrandingListByDesignerId } from '../../../../Contexts/Designer/Branding';

function CreateBrandingScreen({ navigation, route }) {
  const { data: userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [position, setPosition] = useState('');
  const [brandingName, setBrandingName] = useState('');
  const [description, setDesciption] = useState('');
  const [tagText, setTagText] = useState('');
  const [styleTags, setStyleTags] = useState([]);
  const [styleMenuList, setStyleMenuList] = useState([]);
  const [shopExtraInfoList, setShopExtraInfoList] = useState([]);

  const addStyleTags = () => {
    if (styleTags.length > 2) {
      setTagText('');
      return Alert.alert('키워드 등록은 최대 3개까지 입력이 가능합니다');
    }
    setStyleTags([...styleTags, tagText]);
    setTagText('');
  };
  const deleteStyleTags = (deleteTag) => {
    const filteredStyleTags = styleTags.filter((tag) => tag != deleteTag);
    setStyleTags(filteredStyleTags);
  };

  const registerHandler = async () => {
    if (!shopName) {
      return Alert.alert('헤어샵명을 입력해주세요!');
    }
    if (!shopAddress) {
      return Alert.alert('헤어샵 위치를 입력해주세요!');
    }
    if (!position) {
      return Alert.alert('헤어샵명을 입력해주세요!');
    }
    if (!brandingName) {
      return Alert.alert('포트폴리오 이름을 입력해주세요!');
    }
    if (!description) {
      return Alert.alert('상세 설명을 입력해주세요!');
    }
    const response = BrandingAPI.registerBranding({
      user_id: userInfo.id,
      description: description,
      shop_name: shopName,
      address: shopAddress,
      position: position,
      title: brandingName,
      keyword_array: styleTags.toString(),
      main: 0,
      authentication: 0,
      styleIdList: [1, 2],
    });
    if (response) {
      await dispatch(getBrandingListByDesignerId(userInfo.id));
      navigation.push('BrandingMain');
      Alert.alert('포트폴리오 작성이 성공적으로 완료되었습니다!');
    } else {
      Alert.alert('Error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <BrandingInput
        title="포트폴리오 이름"
        value={brandingName}
        setValue={setBrandingName}
        placeholderMessage="고객님에게는 노출되지 않는 비공개 메모입니다"
        placeholderColor="#FF533A"
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
      <BrandingInput
        title="키워드 등록"
        subTitle="(최대 3개)"
        value={tagText}
        setValue={setTagText}
        setStyleTags={setStyleTags}
        placeholderMessage="포트폴리오에 관련된 키워드들을 입력해주세요"
        placeholderColor="#878787"
        returnKeyType="next"
        styleTags={styleTags}
        addStyleTags={addStyleTags}
        deleteStyleTags={deleteStyleTags}
      />
      <View style={styles.lengthArea}>
        <Text style={[styles.lengthText, description.length === 400 && styles.maxLengthText]}>
          ( {description.length} / 400 )
        </Text>
      </View>
      <StyleMenuInput
        title="스타일 메뉴"
        navigation={navigation}
        styleMenuList={styleMenuList}
        setStyleMenuList={setStyleMenuList}
      />
      <Line />
      <BrandingInput
        title="헤어샵"
        value={shopName}
        setValue={setShopName}
        placeholderMessage="근무중인 헤어샵을 입력해주세요"
        placeholderColor="#878787"
      />
      <BrandingInput
        title="직급"
        value={position}
        setValue={setPosition}
        placeholderMessage="직급을 입력해주세요"
        placeholderColor="#878787"
      />
      <BrandingInput
        title="영업시간"
        value={shopName}
        setValue={setShopName}
        placeholderMessage="헤어샵의 영업시간을 입력해주세요"
        placeholderColor="#878787"
      />

      <BrandingInput
        title="연락처"
        value={shopName}
        setValue={setShopName}
        placeholderMessage="헤어샵의 연락처를 입력해주세요"
        placeholderColor="#878787"
      />
      <BrandingInput
        title="헤어샵 위치"
        value={shopAddress}
        setValue={setShopAddress}
        placeholderMessage="서울특별시 강남구"
        placeholderColor="#878787"
      />

      <ExtraShopInfoInput
        title="부가 정보"
        subTitle="복수 응답 가능"
        shopExtraInfoList={shopExtraInfoList}
        setShopExtraInfoList={setShopExtraInfoList}
      />
      <TouchableOpacity style={styles.registerBtnArea} onPress={registerHandler}>
        <Text style={styles.registerBtnText}>저장하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

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
  lengthArea: {
    marginTop: -8,
    marginRight: 16,
  },
  lengthText: {
    textAlign: 'right',
    color: 'gray',
    fontSize: 15,
  },
  maxLengthText: {
    color: 'red',
  },
});

export default CreateBrandingScreen;
