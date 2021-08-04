import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import CardInfo from '../../../Components/Card/cardInfo';
import CardStyle from '../../../Components/Card/cardStyle';

function CreateBidScreen({ navigation, route }) {
  const { info } = route.params;
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceValue, setPriceValue] = useState(null);
  const [priceItems, setPriceItems] = useState([
    { label: '커트', value: '커트' },
    { label: '파마', value: '파마' },
    { label: '염색', value: '염색' },
  ]);
  const [needCare, setNeedCare] = useState(null);
  const [bidLetter, setBidLetter] = useState('');

  const registerBidHandler = () => {
    navigation.navigate('BidRegistered');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <CardStyle styleLists={info.images} />
        <CardInfo info={info} navigation={navigation} />
        <View style={styles.priceContainer}>
          <View style={styles.titleTextArea}>
            <Text style={styles.titleText}>희망 예산</Text>
          </View>
          <View style={styles.priceArea}>
            <Text style={styles.text}>{info.price_limit}</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.boxContainer}>
          <View style={styles.titleTextArea}>
            <Text style={styles.titleText}>시술 정보</Text>
          </View>
          <DropDownPicker
            zIndex={1000}
            open={priceOpen}
            value={priceValue}
            items={priceItems}
            setOpen={setPriceOpen}
            setValue={setPriceValue}
            setItems={setPriceItems}
            placeholder="대분류"
            style={styles.dropDownArea}
            dropDownContainerStyle={styles.dropDownArea}
            placeholderStyle={{ color: 'grey', fontSize: 15 }}
            listParentLabelStyle={{ color: 'grey', fontSize: 15 }}
            listMode="SCROLLVIEW"
          />
          <DropDownPicker
            zIndex={1000}
            open={priceOpen}
            value={priceValue}
            items={priceItems}
            setOpen={setPriceOpen}
            setValue={setPriceValue}
            setItems={setPriceItems}
            placeholder="소분류"
            style={styles.dropDownArea}
            dropDownContainerStyle={styles.dropDownArea}
            placeholderStyle={{ color: 'grey', fontSize: 15 }}
            listParentLabelStyle={{ color: 'grey', fontSize: 15 }}
            listMode="SCROLLVIEW"
          />
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.titleTextArea}>
            <Text style={styles.titleText}>케어가 필요하신가요?</Text>
          </View>
          <View style={styles.needCareArea}>
            <TouchableOpacity
              style={[styles.needCareBtn, needCare === true && styles.active]}
              onPress={() => setNeedCare(true)}>
              <Text style={[styles.needCareText, needCare === true && styles.active]}>네</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.needCareBtn, needCare === false && styles.active]}
              onPress={() => setNeedCare(false)}>
              <Text style={[styles.needCareText, needCare === false && styles.active]}>아니오</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.titleTextArea}>
            <Text style={styles.titleText}>비드 레터</Text>
          </View>
          <TextInput
            style={styles.bidLetterArea}
            value={bidLetter}
            onChangeText={(text) => setBidLetter(text)}
            placeholder="고객님께서 코멘트를 남겨주세요. 정성스러운 비드를 남겨주실 수록 더 많은 선택을 받으실 수 있습니다! (최대 400자)"
            autoCapitalize="sentences"
            autoCorrect
            maxLength={400}
            multiline={true}
            returnKeyType="next"
          />
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.titleTextArea}>
            <Text style={styles.titleText}>추천 스타일</Text>
          </View>
          <View style={styles.styleContainer}>
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
        <View style={styles.bottomBtnArea}>
          <TouchableOpacity style={[styles.bottomBtn, styles.leftBtn]}>
            <Text style={styles.leftBtnText}>임시저장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBtn, styles.rightBtn]}
            onPress={registerBidHandler}>
            <Text style={styles.rightBtnText}>발송하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  priceContainer: {
    marginTop: 26,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  boxContainer: {
    margin: 16,
    marginTop: 0,
    marginBottom: 24,
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
  },
  priceArea: {
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    height: 40,
  },
  text: {
    color: '#111111',
    lineHeight: 17,
    fontSize: 14,
    padding: 13,
  },
  line: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    height: 9,
    marginBottom: 16,
  },
  dropDownArea: {
    flex: 1,
    borderColor: 'rgb(214,214,214)',
    borderRadius: 3,
    height: 42,
  },
  needCareArea: {
    flexDirection: 'row',
  },
  needCareBtn: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  needCareText: {
    color: '#878787',
    fontSize: 14,
    lineHeight: 17,
  },
  active: {
    borderColor: '#0A0A32',
    color: '#0A0A32',
  },
  bidLetterArea: {
    height: 167,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 3,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  styleContainer: {
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
  bottomBtnArea: {
    flexDirection: 'row',
  },
  bottomBtn: {
    justifyContent: 'center',
    height: 65,
  },
  leftBtn: {
    flex: 2,
    backgroundColor: '#fff',
  },
  rightBtn: {
    flex: 3,
    backgroundColor: '#0A0A32',
  },
  leftBtnText: {
    color: '#878787',
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 22,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  rightBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 22,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});
export default CreateBidScreen;
