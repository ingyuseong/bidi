import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../Common/button';

function CardInfo({ info, navigation, height, tagBackgroundColor, tagColor }) {
  const name = info.user ? info.user.name : info.name;
  const img_src = info.user ? info.user.img_src : info.img_src;
  return (
    <View style={styles.designerContainer}>
      <View style={styles.designerInfo}>
        <Image
          style={styles.designerImg}
          source={{
            uri: img_src,
          }}
        />
        <View style={styles.designerBox}>
          <View style={styles.designerNameArea}>
            <Text style={styles.designerName}>{name}</Text>
            {/* <Button
              title="더보기"
              pressHandler={() => navigation.navigate('DesignerDetail', { newInfo: info })}
            /> */}
          </View>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>
              @ {info.shopName || info.shop_name || info.address || info.user.address}
            </Text>
            <Ionicons name="location-outline" size={15} />
            <Text style={styles.shopDistance}>{info.distance_limit || info.distance}km 이내</Text>
          </View>
        </View>
        {/* <Button
          style={styles.moreBtn}
          title="더보기"
          // pressHandler={() => navigation.navigate('DesignerDetail', { newInfo: info })}
        /> */}
      </View>
      <View style={styles.designerTag}>
        {info.keywords &&
          info.keywords.map((item, index) => (
            <View style={{ ...styles.tag, backgroundColor: tagBackgroundColor }} key={index}>
              <Text style={{ ...styles.tagText, color: tagColor }}># {item}</Text>
            </View>
          ))}
      </View>
      <View style={{ ...styles.designerTextContainer, height }}>
        <Text style={styles.designerText} numberOfLines={3}>
          {info.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  designerContainer: {
    padding: 15,
    flex: 1,
  },
  designerInfo: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  designerImg: {
    resizeMode: 'cover',
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgb(243,243,243)',
  },
  designerTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  designerTextContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    padding: 7,
  },
  designerText: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 21,
  },
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
    flex: 1,
  },
  shopName: {
    marginRight: 10,
  },
  shopDistance: {},
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: '#8D8D8D',
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: -0.5,
    fontSize: 13,
  },
});

export default CardInfo;
