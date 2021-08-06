import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
  useEffect(() => {
    getDesignerInfo();
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
            <View style={{ height: '60%' }}>
              <CardStyle styleLists={info.styles} />
            </View>
            <CardInfo info={info} navigation={navigation} height={150} />
            <TouchableOpacity style={styles.bidiBtn}>
              <Icon name="thumbs-up" size={25} style={styles.bidiIcon} />
            </TouchableOpacity>
          </View>
          <View>
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
    margin: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'relative',
  },
  bidiBtn: {
    position: 'absolute',
    backgroundColor: '#FF533A',
    width: 50,
    height: 50,
    right: 0,
    top: '60%',
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
});

export default DesignerListScreen;
