import React, { useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BrandingAPI from '../../../../Api/branding';

import Line from '../../../../Components/Common/line';
import Loading from '../../../../Components/Common/loading';
import BrandingInput from '../../../../Components/Branding/brandingInput';
import ShopAddressInput from '../../../../Components/Branding/shopAddressInput';
import StyleMenuInput from '../../../../Components/Branding/styleMenuInput';
import ExtraShopInfoInput from '../../../../Components/Branding/extraShopInfoInput';
import { getBrandingListByDesignerId } from '../../../../Contexts/Designer/Branding';

function CreateBrandingScreen({ navigation, route }) {
  const { data: userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [brandingName, setBrandingName] = useState('');
  const [description, setDesciption] = useState('');
  const [tagText, setTagText] = useState('');
  const [styleTags, setStyleTags] = useState([]);
  const [styleMenuList, setStyleMenuList] = useState([]);
  const [shopName, setShopName] = useState('');
  const [position, setPosition] = useState('');
  const [shopAddress, setShopAddress] = useState({});
  const [shopOperationTime, setShopOperationTime] = useState('');
  const [shopBreakTime, setShopBreakTime] = useState('');
  const [shopNumber, setShopNumber] = useState('');
  const [shopExtraInfoList, setShopExtraInfoList] = useState([]);
  const [shopAutoSaveSelected, setShopAutoSaveSelected] = useState(null);

  const checkHandler = () => {
    setShopAutoSaveSelected(!shopAutoSaveSelected);
  };
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
    const styleIdList = styleMenuList.map((style) => style.id);
    const extraInfoList = shopExtraInfoList.map((item) => item.value);
    if (!brandingName) {
      return Alert.alert('포트폴리오 이름을 입력해주세요!');
    }
    if (!description) {
      return Alert.alert('상세 설명을 입력해주세요!');
    }
    if (!shopName) {
      return Alert.alert('헤어샵명을 입력해주세요!');
    }
    if (!shopAddress.address) {
      return Alert.alert('헤어샵 위치를 입력해주세요!');
    }
    if (!styleIdList.length) {
      return Alert.alert('스타일을 하나 이상 등록해주세요!');
    }
    const response = BrandingAPI.registerBranding({
      user_id: userInfo.id,
      title: brandingName,
      description: description,
      keyword_array: styleTags.toString(),
      styleIdList: styleIdList,
      shop_name: shopName,
      position: position,
      operation_time: shopOperationTime,
      break_time: shopBreakTime,
      shop_number: shopNumber,
      address: [shopAddress.zoneCode, shopAddress.address, shopAddress.detailAddress].toString(),
      extra_info: extraInfoList.toString(),
      main: 0,
      authentication: 0,
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
        title="운영 시간"
        value={shopOperationTime}
        setValue={setShopOperationTime}
        placeholderMessage="운영시간을 입력해주세요"
        placeholderColor="#878787"
      />
      <BrandingInput
        title="휴무일"
        value={shopBreakTime}
        setValue={setShopBreakTime}
        placeholderMessage="휴무일을 입력해주세요"
        placeholderColor="#878787"
      />
      <BrandingInput
        title="연락처"
        value={shopNumber}
        setValue={setShopNumber}
        placeholderMessage="헤어샵의 연락처를 입력해주세요"
        placeholderColor="#878787"
      />
      <ShopAddressInput
        title="헤어샵 위치"
        shopAddress={shopAddress}
        setShopAddress={setShopAddress}
        navigation={navigation}
      />
      <ExtraShopInfoInput
        title="부가 정보"
        subTitle="복수 응답 가능"
        shopExtraInfoList={shopExtraInfoList}
        setShopExtraInfoList={setShopExtraInfoList}
      />
      <View style={styles.inputBox}>
        <View style={styles.titleTextArea}>
          <Text style={styles.titleText}>헤어샵 정보를 저장하시겠습니까?</Text>
        </View>
        {shopAutoSaveSelected ? (
          <TouchableOpacity style={styles.checkedIconArea} onPress={() => checkHandler()}>
            <AntDesign name="check" size={25} style={styles.checkIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.checkIconArea} onPress={() => checkHandler()}>
            <AntDesign name="check" size={25} style={styles.checkIcon} />
          </TouchableOpacity>
        )}
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
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: '#111111',
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: -0.5,
    fontSize: 17,
  },
  titleTextArea: {
    flexDirection: 'row',
    alignItems: 'center',
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
  checkIconArea: {
    backgroundColor: 'gray',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIconArea: {
    backgroundColor: '#0A0A32',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CreateBrandingScreen;
