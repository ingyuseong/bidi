import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getBrandingListByDesignerId,
  getMainBrandingByDesignerId,
  patchMainBranding,
} from '../../../../Contexts/Designer/Branding';

import Line from '../../../../Components/Common/line';
import Loading from '../../../../Components/Common/loading';
import ItemHeader from '../../../../Components/ListItem/itemHeader';
import ItemContent from '../../../../Components/ListItem/itemContent';
import ItemBottomBtn from '../../../../Components/ListItem/itemBottomBtn';
import MainItemCard from '../../../../Components/ListItem/mainItemCard';
import BrandingAPI from '../../../../Api/branding';

function BrandingListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: userInfo } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: brandingList,
    loading,
    error,
  } = useSelector((state) => state.designerBranding) || {
    data: [],
    loading: false,
    error: null,
  };

  useEffect(() => {
    dispatch(getBrandingListByDesignerId(userInfo.id));
    // dispatch(getMainBrandingByDesignerId(userInfo.id));
  }, [dispatch]);

  const moveToDetailBranding = (info) => {
    navigation.push('DetailBranding', { info });
  };

  const registerAlert = (id) => {
    Alert.alert('대표 포트폴리오로 등록하시겠습니까?', '', [
      { text: '취소', style: 'cancel' },
      {
        text: '등록하기',
        onPress: () => {
          registerSubmitHandler(id);
        },
      },
    ]);
  };
  const registerSubmitHandler = async (id) => {
    const response = BrandingAPI.patchMainBranding(id, userInfo.id);
    if (response) {
      dispatch(patchMainBranding);
      navigation.push('BrandingMain');
      Alert.alert('대표 포트폴리오 설정되었습니다!');
    }
  };
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
      {brandingList[0].main && <MainItemCard info={brandingList[0]} navigation={navigation} />}
      <ScrollView>
        {brandingList.map((branding, index) => {
          if (!branding.main) {
            return (
              <View style={styles.bidContainer} key={index}>
                <ItemHeader
                  info={branding}
                  screen="branding"
                  clickHandler={() => {
                    setModalVisible(true);
                  }}
                />
                <ItemContent
                  navigation={navigation}
                  info={branding}
                  screen="branding"
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
                <ItemBottomBtn
                  info={branding}
                  screen="branding"
                  leftBtnText="더보기"
                  leftBtnHandler={() => moveToDetailBranding(branding)}
                  rightBtnText="대표 등록"
                  rightBtnHandler={() => registerAlert(branding.id, branding.user_id)}
                />
                <Line />
              </View>
            );
          }
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.addBrandingBtn}
        onPress={() => {
          navigation.push('CreateBranding');
        }}>
        <Ionicons name="add" size={50} style={styles.addBrandingIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBrandingBtn: {
    position: 'absolute',
    width: 65,
    height: 65,
    backgroundColor: '#0A0A32',
    borderRadius: 50,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000', //그림자색
    shadowOpacity: 0.3, //그림자 투명도
    shadowOffset: { width: 2, height: 2 }, //그림자 위치
  },
  addBrandingIcon: {
    color: 'white',
  },
  noBrandingContainer: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleArea: {
    marginTop: 16,
    marginBottom: 16,
  },
  titleText: {
    color: '#0A0A32',
    fontSize: 23,
    lineHeight: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitleArea: {
    marginBottom: 16,
  },
  subTitleText: {
    textAlign: 'center',
    color: '#0A0A32',
    fontSize: 16,
    lineHeight: 25,
  },
  registerBtn: {
    width: 343,
    height: 55,
    backgroundColor: '#0A0A32',
    borderRadius: 55,
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.5,
  },
});

export default BrandingListScreen;
