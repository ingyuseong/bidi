import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function UserInfo({ info, keywords }) {
  return (
    <View style={styles.userContainer}>
      <View style={styles.userInfo}>
        <Image
          style={styles.userImg}
          source={{
            uri: info.img_src,
          }}
        />
        <View style={styles.userBox}>
          <View style={styles.userNameArea}>
            <Text style={styles.userName}>{info.name}</Text>
          </View>
          <View style={styles.shopInfo}>
            <Ionicons name="location-outline" size={15} />
            <Text style={styles.shopDistance}>{info.address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.userTag}>
        {keywords != '' ? (
          keywords.map((item, index) => (
            <View style={styles.tag} key={index}>
              <Text style={{ color: '#8D8D8D' }}># {item}</Text>
            </View>
          ))
        ) : (
          <View style={styles.tag}>
            <Text style={{ color: '#8D8D8D' }}>키워드 없음</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    padding: 15,
  },
  userInfo: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImg: {
    resizeMode: 'cover',
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgb(243,243,243)',
  },
  userTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  userTextContainer: {
    alignItems: 'flex-start',
    height: 150,
    padding: 7,
  },
  userText: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 21,
  },
  shopInfo: {
    flexDirection: 'row',
  },
  userNameArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
  },
  userName: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userBox: {
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
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginTop: 10,
    marginRight: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserInfo;
