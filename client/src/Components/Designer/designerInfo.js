import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../Common/button';

function DesignerInfo({ info, navigation }) {
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
            <Button
              title="더보기"
              // pressHandler={() => navigation.navigate('DesignerDetail', { newInfo: info })}
            />
          </View>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>@ {info.shopName}</Text>
            <Ionicons name="location-outline" size={15} />
            <Text style={styles.shopDistance}>{info.distance}</Text>
          </View>
        </View>
      </View>
      <View style={styles.designerTag}>
        {info.keywords &&
          info.keywords.map((item, index) => (
            <View style={styles.tag} key={index}>
              <Text>#{item}</Text>
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
    borderBottomWidth: 0,

    padding: 15,
  },
  styleImg: {
    resizeMode: 'cover',
    width: 370,
    height: '100%',
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
    backgroundColor: '#e2e2e2',
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DesignerInfo;
