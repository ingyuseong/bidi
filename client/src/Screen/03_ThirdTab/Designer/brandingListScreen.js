import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';
import ItemCard from '../../../Components/ListItem/itemCard';
import MainItemCard from '../../../Components/ListItem/mainItemCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

function BrandingListScreen({ navigation }) {
  const [brandingList, setBrandingList] = useState([]);
  useEffect(() => {
    async function fetchMode() {
      const user = await BidiStorage.getData(STORAGE_KEY);
      await fetch('http://127.0.0.1:3000' + `/api/branding/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          setBrandingList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchMode();
  }, []);
  return (
    <View style={styles.container}>
      {brandingList.length > 0 ? (
        <>
          {brandingList[0].main && <MainItemCard info={brandingList[0]} navigation={navigation} />}
          <ScrollView>
            {brandingList.map((branding, index) => {
              if (!branding.main) {
                return (
                  <ItemCard key={index} info={branding} navigation={navigation} screen="branding" />
                );
              }
            })}
          </ScrollView>
          <TouchableOpacity
            style={styles.addBrandingBtn}
            onPress={() => {
              navigation.navigate('CreateBranding');
            }}>
            <Ionicons name="add" size={50} style={styles.addBrandingIcon} />
          </TouchableOpacity>
        </>
      ) : (
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
      )}
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
