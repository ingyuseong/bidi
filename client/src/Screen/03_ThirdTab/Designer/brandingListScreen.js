import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import BidiStorage from '../../../Lib/storage';
import { STORAGE_KEY } from '../../../Lib/constant';
import ItemCard from '../../../Components/ListItem/itemCard';
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
          console.log(response.data);
          setBrandingList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchMode();
  }, []);
  return (
    <>
      <ScrollView style={styles.container}>
        {brandingList.map((branding, index) => (
          <ItemCard key={index} info={branding} navigation={navigation} screen="branding" />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addBrandingBtn}>
        <Ionicons name="add" size={50} style={styles.addBrandingIcon} />
      </TouchableOpacity>
    </>
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
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBrandingIcon: {
    color: 'white',
  },
});

export default BrandingListScreen;
