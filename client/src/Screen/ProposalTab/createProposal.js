import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY, KEYWORDS } from '../../Lib/constant';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

import BottomButton from '../../Components/Common/bottomButton';

function CreateProposalScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState('');
  const [afterImageStyle, setAfterImageStyle] = useState('none');
  // DropDown 관련
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceValue, setPriceValue] = useState(null);
  const [priceItems, setPriceItems] = useState([
    { label: '1만원 이내', value: '10000' },
    { label: '3만원 이내', value: '30000' },
    { label: '5만원 이내', value: '50000' },
    { label: '10만원 이내', value: '100000' },
    { label: '제한 없음', value: '1000000' },
  ]);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [distanceValue, setDistanceValue] = useState(null);
  const [distanceItems, setDistanceItems] = useState([
    { label: '1km 이내', value: '1000' },
    { label: '5km 이내', value: '5000' },
    { label: '10km 이내', value: '10000' },
    { label: '제한 없음', value: '100000' },
  ]);

  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState(KEYWORDS);
  const [keyCount, setKeyCount] = useState(0);
  const [description, setDescription] = useState('');

  const getUserInfo = async (user) => {
    await fetch('http://127.0.0.1:3000' + `/api/user/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUserInfo(result.data);
        setLocation(result.data.address);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      getUserInfo(user);
    }
    fetchMode();
  }, []);

  const selectKeyword = (id) => {
    if (keyCount < 3 || keyword[id].selected) {
      setKeyword(keyword.map((key) => (key.id == id ? { ...key, selected: !key.selected } : key)));
      if (!keyword[id].selected) setKeyCount(keyCount + 1);
      else setKeyCount(keyCount - 1);
    } else Alert.alert('3개를 초과하였습니다!');
  };

  const keywordList = KEYWORDS.map(({ id, title, icon }) => (
    <TouchableHighlight
      key={id}
      underlayColor="white"
      style={keyword[id].selected ? styles.keywordPress : styles.keywordNormal}
      onPress={() => selectKeyword(id)}>
      <Text style={keyword[id].selected ? styles.keywordTextPress : styles.keywordTextNormal}>
        {icon} {title}
      </Text>
    </TouchableHighlight>
  ));

  const proposalHandler = async (e) => {
    navigation.navigate('SelectAfterImage', {
      setAfterImageStyle: setAfterImageStyle,
      userInfo: userInfo,
    });
  };

  const initializeHandler = async (e) => {
    setPriceValue(null);
    setDistanceValue(null);
    setKeyword(KEYWORDS);
    setKeyCount(0);
    setDescription('');
  };

  const submitHandler = async (e) => {
    if (afterImageStyle != 'none') {
      const keywords = keyword
        .filter((key) => key.selected)
        .map((key) => key.title)
        .toString();
      await fetch('http://127.0.0.1:3000' + '/api/proposal/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          before_src: `https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/user/${userInfo.id}/input/align_image.png`,
          after_src: `https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/user/${userInfo.id}/result/${afterImageStyle}.jpg`,
          user_id: userInfo.id,
          price_limit: priceValue,
          distance_limit: distanceValue,
          keywords: keywords.toString(),
          description,
          status: 'wait',
        }),
      })
        .then(() => {
          navigation.replace('ProposalRegistered');
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (priceValue == null) {
      Alert.alert('사진을 선택해주세요!');
    } else if (distanceValue == null) {
      Alert.alert('사진을 선택해주세요!');
    } else {
      Alert.alert('사진을 선택해주세요!');
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* 1. 헤어스타일 선택하기 */}
      <View style={styles.textBox}>
        <Text style={styles.title}>헤어스타일 선택하기</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={{
              uri: userInfo.img_src,
            }}
          />
          <View before style={styles.imageTypeLabel}>
            <Text style={styles.imageTypeLabelText}>Before</Text>
          </View>
        </View>
        <View style={styles.imageBox}>
          {afterImageStyle == 'none' ? (
            <View style={styles.image}>
              <TouchableOpacity activeOpacity={0.8} onPress={proposalHandler}>
                <Text style={styles.imageLabel}>사진 등록하기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.imageAfter}
              onPress={proposalHandler}>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{
                  uri: `https://bidi-s3.s3.ap-northeast-2.amazonaws.com/image/user/${userInfo.id}/result/${afterImageStyle}.jpg`,
                }}
              />
            </TouchableOpacity>
          )}
          <View style={{ ...styles.imageTypeLabel, backgroundColor: 'rgb(11,14,43)' }}>
            <Text style={styles.imageTypeLabelText}>After</Text>
          </View>
        </View>
      </View>

      {/* 2. 금액 범위 설정 */}
      <View style={styles.textBox}>
        <Text style={styles.title}>금액 범위 설정</Text>
      </View>
      <DropDownPicker
        zIndex={1000}
        open={priceOpen}
        value={priceValue}
        items={priceItems}
        setOpen={setPriceOpen}
        setValue={setPriceValue}
        setItems={setPriceItems}
        placeholder="원하는 적정 시술가격을 선택해주세요"
        style={{
          width: '90%',
          borderColor: 'rgb(214,214,214)',
          borderRadius: 3,
          height: 42,
          marginLeft: '5%',
          marginTop: 10,
        }}
        dropDownContainerStyle={{
          width: '90%',
          borderColor: 'rgb(214,214,214)',
          borderRadius: 3,
          marginLeft: '5%',
          marginTop: 10,
        }}
        placeholderStyle={{ color: 'grey', fontSize: 15 }}
        listParentLabelStyle={{ color: 'grey', fontSize: 15 }}
        listMode="SCROLLVIEW"
      />

      {/* 3. 원하는 거리 설정 */}
      <View style={{ marginTop: 20 }}></View>
      <View style={styles.textBox}>
        <Text style={styles.title}>원하는 거리</Text>
      </View>
      <View style={styles.dropdownBox}>
        <TextInput
          style={styles.locationInput}
          underlineColorAndroid="transparent"
          editable={false}
          selectTextOnFocus={false}
          value={location}
        />
      </View>
      <DropDownPicker
        zIndex={500}
        open={distanceOpen}
        value={distanceValue}
        items={distanceItems}
        setOpen={setDistanceOpen}
        setValue={setDistanceValue}
        setItems={setDistanceItems}
        placeholder="반경 선택하기"
        style={{
          width: '90%',
          borderColor: 'rgb(214,214,214)',
          borderRadius: 3,
          height: 42,
          backgroundColor: 'white',
          marginLeft: '5%',
        }}
        dropDownContainerStyle={{
          width: '90%',
          borderColor: 'rgb(214,214,214)',
          borderRadius: 3,
          marginLeft: '5%',
        }}
        placeholderStyle={{ color: 'grey', fontSize: 15 }}
        listParentLabelStyle={{ color: 'grey', fontSize: 15, backgroundColor: 'white' }}
        listMode="SCROLLVIEW"
      />

      {/* 4. 무엇이 제일 중요하세요? */}
      <View style={{ marginTop: 20 }}></View>
      <View style={styles.textBox}>
        <Text style={styles.title}>
          무엇이 제일 중요하세요?{' '}
          <Text style={{ fontSize: 14, fontWeight: '400' }}>(최대 3개)</Text>
        </Text>
      </View>
      <View style={styles.keywordBox}>
        <View style={styles.keywordRow}>{keywordList}</View>
      </View>

      {/* 5. 상세 설명 */}
      <View style={styles.textBox}>
        <Text style={styles.title}>상세 설명</Text>
      </View>
      <View style={styles.keywordBox}>
        <TextInput
          value={description}
          style={styles.TextArea}
          onChangeText={setDescription}
          placeholder={'스타일에 대해 디자이너에게 궁금한 점을 작성해보세요 \n (최대 400자)'}
          multiline={true}
        />
      </View>

      {/* 6. submit */}
      {/* <View style={styles.submitBox}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ ...styles.submitButton, width: '60%' }}
          onPress={initializeHandler}>
          <Text style={{ ...styles.submitText }}>초기화하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...styles.submitButton,
            backgroundColor: '#FF533A',
            borderColor: '#FF533A',
            width: '40%',
          }}
          onPress={submitHandler}>
          <Text style={{ ...styles.submitText, color: 'white' }}>등록하기</Text>
        </TouchableOpacity>
      </View> */}
      <View style={{ marginTop: 80 }}></View>
      <BottomButton
        leftName="초기화"
        rightName="등록하기"
        leftRatio={40}
        leftHandler={initializeHandler}
        rightHandler={submitHandler}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: 'white',
  },
  textBox: {
    width: '100%',
    margin: 15,
    marginBottom: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    width: '100%',
    height: '60%',
  },
  imageContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 200,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  imageBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-around',
    width: '50%',
    height: '100%',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '90%',
    borderColor: 'rgb(243,243,243)',
    borderWidth: 1,
    backgroundColor: 'rgb(243,243,243)',
  },
  imageAfter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '90%',
    borderColor: 'rgb(243,243,243)',
    borderWidth: 1,
  },
  imageLabel: {
    fontSize: 15,
    color: 'rgb(153,153,153)',
  },
  imageTypeLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 70,
    height: 26,
    left: 1,
    bottom: 0,
    backgroundColor: '#FF533A',
    borderRadius: 3,
  },
  imageTypeLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  dropdownBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  locationInput: {
    width: '90%',
    height: 42,
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: 'rgb(243,243,243)',
    color: 'rgb(153,153,153)',
    padding: 10,
    zIndex: 2,
  },
  keywordBox: {
    width: '100%',
    padding: 10,
    marginLeft: 10,
  },
  keywordRow: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'space-around',
    marginBottom: 7,
  },
  keywordNormal: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(214,214,214)',
    borderWidth: 1.3,
    borderRadius: 3,
    height: 40,
    marginRight: 10,
    marginBottom: 10,
  },
  keywordPress: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FF533A',
    borderWidth: 1.3,
    borderRadius: 3,
    height: 40,
    marginRight: 10,
    marginBottom: 10,
  },
  keywordTextNormal: {
    padding: 10,
    color: 'grey',
  },
  keywordTextPress: {
    padding: 10,
    fontWeight: '600',
    color: '#FF533A',
  },
  TextArea: {
    width: '95%',
    height: 150,
    borderColor: 'rgb(214,214,214)',
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    paddingTop: 10,
    marginBottom: 20,
  },
  submitBox: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    height: 70,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    borderColor: 'rgb(214,214,214)',
    borderTopWidth: 1,
  },
  submitText: {
    color: 'grey',
    fontSize: 18,
  },
});

export default CreateProposalScreen;

// const { userInfo } = route.params;

// const [userType, setUserType] = useState('');
// const [userName, setUserName] = useState('');
// const [userEmail, setUserEmail] = useState('');
// const [userAddress, setUserAddress] = useState('');

// const handleSubmitButton = async () => {
// };
