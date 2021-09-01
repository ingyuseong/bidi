import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

// Components
import Icon from 'react-native-vector-icons/FontAwesome';
import CardInfo from '../../../Components/Card/cardInfo';
import CardStyle from '../../../Components/Card/cardStyle';
import DesignerDetail from './designerDetailScreen';
import Loading from '../../../Components/Common/loading';
import Swiper from 'react-native-swiper';

// Redux Action
import { getBrandingList } from '../../../Contexts/Branding/action';

function DesignerListScreen({ navigation }) {
  const { data: brandingList, loading, error } = useSelector((state) => state.branding);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandingList());
  }, [dispatch]);
  if (loading || error) return <Loading loading />;
  if (!brandingList) return null;
  return (
    <Swiper style={styles.wrapper} loop={false} showsButtons={false} showsPagination={false}>
      {brandingList.map((branding, index) => (
        <Swiper
          key={index}
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          loop={false}
          horizontal={false}>
          <View style={styles.container}>
            <View style={{ height: '60%' }}>
              <CardStyle styleLists={branding.brandingStyles} isUser={true} />
              <TouchableOpacity
                style={styles.bidiBtn}
                onPress={() => Alert.alert('해당 디자이너에게 제안서가 전송되었습니다!')}>
                <Icon name="flash" size={25} style={styles.bidiIcon} />
              </TouchableOpacity>
            </View>
            <CardInfo
              info={branding}
              navigation={navigation}
              height={150}
              tagBackgroundColor={'#eeeeee'}
              tagColor="#8D8D8D"
            />
          </View>
          <View>
            <DesignerDetail branding={branding} />
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
});

export default DesignerListScreen;
