import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import CardInfo from '../../../Components/Card/cardInfo';
import CardStyle from '../../../Components/Card/cardStyle';
import DesignerDetail from './designerDetailScreen';
import Swiper from 'react-native-swiper';

function DesignerListScreen({ navigation }) {
  const [infoLists, setInfo] = useState([]);

  const getDesignerInfo = async () => {
    await fetch('http://127.0.0.1:3000' + '/api/branding/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(async (result) => {
        setInfo(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(async () => {
    await getDesignerInfo();
  }, []);

  if (infoLists == []) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }
  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {infoLists.map((info, index) => (
        <Swiper
          key={index}
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          loop={false}
          horizontal={false}>
          <View style={styles.container}>
            <CardStyle styleLists={info.styles} />
            <CardInfo info={info} navigation={navigation} />
          </View>
          <View style={styles.container}>
            <DesignerDetail info={info} />
          </View>
        </Swiper>
      ))}
    </Swiper>
  );
}
const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderBottomWidth: 0,
  },
  styleContainer: {
    flex: 1.5,
  },
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
  },
});

export default DesignerListScreen;
