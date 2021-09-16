import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

import BrandingAPI from '../../../Api/branding';
import {
  getBrandingListByDesignerId,
  getMainBrandingByDesignerId,
  patchMainBranding,
  patchBranding,
} from '../../../Contexts/Designer/Branding';

import Line from '../../../Components/Common/line';
import Loading from '../../../Components/Common/loading';
import CardStyle from '../../../Components/Card/cardStyle';
import DesignerInfo from '../../../Components/Branding/designerInfo';
import DesignerStyle from '../../../Components/Branding/designerStyle';
import DesignerHistory from '../../../Components/Branding/designerHistory';

function BrandingScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { data: userInfo } = useSelector((state) => state.user);
  const { data: brandingList, loading, error } = useSelector((state) => state.designerBranding);
  const BRANDING_ITEMS =
    loading || !brandingList
      ? []
      : brandingList.map((branding, index) => {
          return {
            label: branding.title,
            value: index,
            key: index,
          };
        });

  const [tab, setTab] = useState('tab1');
  const [brandingTypeOpen, setBrandingTypeOpen] = useState(false);
  const [brandingTypeValue, setBrandingTypeValue] = useState(0);
  const [brandingTypeItems, setBrandingTypeItems] = useState(BRANDING_ITEMS);

  const info = loading || !brandingList ? {} : brandingList[brandingTypeValue];

  const tabHandler = () => {
    const nextTab = tab == 'tab1' ? 'tab2' : 'tab1';
    setTab(nextTab);
  };

  const registerAlert = () => {
    Alert.alert('대표 포트폴리오로 등록하시겠습니까?', '', [
      { text: '취소', style: 'cancel' },
      {
        text: '등록하기',
        onPress: () => {
          registerSubmitHandler();
        },
      },
    ]);
  };
  const registerSubmitHandler = async () => {
    const response = BrandingAPI.patchMainBranding(info.id, userInfo.id);
    if (response) {
      dispatch(patchMainBranding);
      Alert.alert('대표 포트폴리오 설정되었습니다!');
      navigation.reset({ routes: [{ name: 'BrandingMain' }] });
    }
  };

  const cancelAlert = () => {
    Alert.alert('대표 등록을 취소하시겠습니까?', '', [
      { text: '취소', style: 'cancel' },
      {
        text: '등록 취소하기',
        onPress: () => {
          statusSubmitHandler();
        },
      },
    ]);
  };
  const statusSubmitHandler = async () => {
    const response = await BrandingAPI.patchBranding(info.id, { main: false });
    if (response) {
      dispatch(patchBranding(info.id, { main: false }));
      Alert.alert('대표 포트폴리오 설정이 취소되었습니다!');
      navigation.reset({ routes: [{ name: 'BrandingMain' }] });
    }
  };

  const deleteAlert = () => {};
  const editHandler = () => {};
  useEffect(() => {
    dispatch(getBrandingListByDesignerId(userInfo.id));
  }, [dispatch]);

  if (loading || error || !brandingList) {
    return <Loading />;
  }

  if (!brandingList.length) {
    return (
      <View style={styles.noBrandingContainer}>
        <Ionicons name="document-text-outline" size={50} style={styles.documentIcon} />
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>아직 포트폴리오를</Text>
          <Text style={styles.titleText}>등록하지 않으셨네요!</Text>
        </View>
        <View style={styles.subTitleArea}>
          <Text style={styles.subTitleText}>지금 바로 포트폴리오를 등록하고</Text>
          <Text style={styles.subTitleText}>더 많은 고객님을 만나보세요!</Text>
        </View>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate('CreateBranding')}>
          <Text style={styles.registerText}>포트폴리오 등록하기 {'>>'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.dropDownWrapper}>
          <DropDownPicker
            zIndex={1000}
            open={brandingTypeOpen}
            value={brandingTypeValue}
            items={BRANDING_ITEMS}
            setOpen={setBrandingTypeOpen}
            setValue={setBrandingTypeValue}
            setItems={setBrandingTypeItems}
            placeholder="포트폴리오 목록"
            style={{ ...styles.dropDownArea, height: 42 }}
            dropDownContainerStyle={styles.dropDownArea}
            placeholderStyle={{ color: 'grey', fontSize: 15 }}
            listParentLabelStyle={{ color: 'grey', fontSize: 15 }}
            listMode="SCROLLVIEW"
          />
        </View>
        {info.main ? (
          <TouchableOpacity style={styles.mainArea} onPress={cancelAlert}>
            <Text style={styles.mainText}>메인 취소</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.notMainArea} onPress={registerAlert}>
            <Text style={styles.notMainText}>메인 등록</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <CardStyle styleLists={info.brandingStyles} isUser={true} height={400} />
        <DesignerInfo info={info} navigation={navigation} />
        <Line />
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={[styles.tab, tab == 'tab1' && styles.active]}>
              <TouchableOpacity onPress={tabHandler}>
                <Text style={[styles.headerTitle, tab == 'tab1' && styles.active]}>
                  대표 스타일
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.tab, tab == 'tab2' && styles.active]}>
              <TouchableOpacity onPress={tabHandler}>
                <Text style={[styles.headerTitle, tab == 'tab2' && styles.active]}>
                  매칭 히스토리
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tabLine}></View>
          <View style={styles.contentContainer}>
            {tab == 'tab1' ? (
              <DesignerStyle navigation={navigation} branding={brandingList[0]} isUser={false} />
            ) : (
              <DesignerHistory branding={info} isUser={false} />
            )}
          </View>
          <View style={styles.bottomBox}>
            <TouchableOpacity style={styles.leftBtnArea} onPress={deleteAlert}>
              <Text style={styles.leftBtnText}>삭제하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightBtnArea} onPress={editHandler}>
              <Text style={styles.rightBtnText}>수정하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
      <TouchableOpacity
        style={styles.editIconArea}
        onPress={() => {
          navigation.push('CreateBranding');
        }}>
        <FontAwesome name="plus" size={30} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: 'white',
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    zIndex: 1050,
  },
  mainArea: {
    borderWidth: 1,
    height: 42,
    width: '25%',
    borderColor: '#0A0A32',
    backgroundColor: '#0A0A32',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  mainText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 18,
    textAlign: 'center',
  },
  notMainArea: {
    borderWidth: 1,
    height: 42,
    width: '25%',
    borderColor: '#DBDBDB',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  notMainText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#878787',
    lineHeight: 18,
    textAlign: 'center',
  },
  dropDownWrapper: {
    zIndex: 1000,
    justifyContent: 'center',
    width: '72%',
  },
  dropDownArea: {
    flex: 1,
    borderColor: 'rgb(214,214,214)',
    borderRadius: 3,
    zIndex: 100,
  },
  line: {
    height: 9,
    backgroundColor: '#F4F4F4',
  },
  bidiBtn: {
    position: 'absolute',
    backgroundColor: '#FF533A',
    width: 50,
    height: 50,
    bottom: -25,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidiIcon: {
    color: 'white',
  },
  styleContainer: {
    flex: 1.5,
  },
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
  },
  editIconArea: {
    width: 65,
    height: 65,
    backgroundColor: '#0A0A32',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  editIcon: {
    color: 'white',
  },
  contentContainer: {},

  headerContainer: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0,
  },
  tabLine: {
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  headerTitle: {
    fontSize: 20,
  },
  tab: {
    marginRight: 30,
  },
  active: {
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderColor: 'black',
    paddingBottom: 5,
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftBtnArea: {
    width: '40%',
    height: 65,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBtnArea: {
    width: '60%',
    height: 65,
    backgroundColor: '#0A0A32',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBtnText: {
    color: '#878787',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
  },
  rightBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
  },
});

export default BrandingScreen;
