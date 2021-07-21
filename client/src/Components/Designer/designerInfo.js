import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function DesignerInfo({ info }) {
  return (
    <View style={styles.designerContainer}>
      <View style={styles.designerInfo}>
        <Image style={styles.designerImg} source={require('../../../public/img/test2.jpeg')} />
        <View style={styles.designerBox}>
          <Text style={styles.designerName}>{info.name}</Text>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>@ {info.shopName}</Text>
            <Ionicons name="location-outline" size={15} />
            <Text style={styles.shopDistance}>{info.distance}</Text>
          </View>
        </View>
      </View>
      <View style={styles.designerTag}>
        {info.keywords.map((item, index) => (
          <View style={styles.tag} key={index}>
            <Text>#{item.keyword}</Text>
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
    flex: 1,
    borderWidth: 0.2,
    borderBottomWidth: 0,
    borderColor: 'gray',
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
  designerName: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  designerBox: {
    flexDirection: 'column',
    marginLeft: 20,
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
