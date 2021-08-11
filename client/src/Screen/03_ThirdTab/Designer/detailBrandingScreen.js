import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import CardStyle from '../../../Components/Card/cardStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardInfo from '../../../Components/Card/cardInfo';
import DesignerDetail from '../../01_FirstTab/User/designerDetailScreen';
function DetailBrandingScreen({ navigation, route }) {
  const { info } = route.params;
  console.log('??', info);
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      showsPagination={false}
      loop={false}
      horizontal={false}>
      <View style={styles.container}>
        <View style={{ height: '60%' }}>
          <CardStyle styleLists={info.styles} isUser={true} />
        </View>
        <CardInfo info={info} navigation={navigation} height={150} />
        <TouchableOpacity style={styles.editIconArea}>
          <Icon name="pencil" size={30} style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <DesignerDetail info={info} />
        <TouchableOpacity
          style={styles.editIconArea}
          onPress={() => {
            navigation.navigate('EditBranding');
          }}>
          <Icon name="pencil" size={30} style={styles.editIcon} />
        </TouchableOpacity>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: 'white',
    borderColor: '#e2e2e2',
    borderRadius: 20,
    shadowColor: 'rgb(17, 17, 17)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    position: 'relative',
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
    right: 20,
    bottom: 20,
  },
  editIcon: {
    color: 'white',
  },
});

export default DetailBrandingScreen;
