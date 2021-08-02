import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../Common/button';

function CardInfo({ info, navigation }) {
  return (
    <View style={styles.designerContainer}>
      <View style={styles.designerInfo}>
        <Image
          style={styles.designerImg}
          source={{
            uri: info.img_src,
          }}
        />
        <View style={styles.designerBox}>
          <View style={styles.designerNameArea}>
            <Text style={styles.designerName}>{info.name}</Text>
            {/* <Button
              title="더보기"
              pressHandler={() => navigation.navigate('DesignerDetail', { newInfo: info })}
            /> */}
          </View>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>@ {info.address || info.shopName}</Text>
            <Ionicons name="location-outline" size={15} />
            <Text style={styles.shopDistance}>{info.distance_limit || info.distance}km</Text>
          </View>
        </View>
      </View>
      <View style={styles.designerTag}>
        {info.keywords &&
          info.keywords.map((item, index) => (
            <View style={styles.tag} key={index}>
              <Text style={styles.tagText}># {item}</Text>
            </View>
          ))}
      </View>
      <View style={styles.designerTextContainer}>
        <Text style={styles.designerText}>{info.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  designerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  designerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  designerImg: {
    resizeMode: 'cover',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  designerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  designerTextContainer: {
    marginTop: 20,
  },
  designerText: {},
  shopInfo: {
    flexDirection: 'row',
  },
  designerNameArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
  },
  designerName: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  designerBox: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
  },
  shopName: {
    marginRight: 10,
  },
  shopDistance: {},
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#E1ECFF',
    borderRadius: 2,
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: '#323274',
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: -0.5,
    fontSize: 13,
  },
});

export default CardInfo;
