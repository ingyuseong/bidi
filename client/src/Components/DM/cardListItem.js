import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';

function CardListItem({ navigation, item }) {

    return (
        <TouchableOpacity
          style={styles.cardItem}
          onPress={async () => {
            navigation.navigate('DirectMessage', {
                room: item,
                user: await BidiStorage.getData(STORAGE_KEY),
            })
          }}
        >
          <View>
            { item['unread'] && <View style={styles.imagePatch}></View> }
            <Image source={{uri: item.user.img_src}} style={styles.profileImage} />
          </View>      
          <View style={styles.itemInfo}>
          <View style={styles.itemUserInfo}>
              <Text style={styles.nameText}>{item.user.name}</Text>
              {
                  item['authenticated'] &&
                  <View style={styles.authenticatedPatch}>
                      <Text style={styles.authenticatedText}>인증 완료</Text>
                  </View>
              }
          </View>
          <View>
              <Text style={styles.contentText}>{item.latestMessage.latestMessage.length ? item.latestMessage.latestMessage[0].content : ''}</Text>
          </View>
          </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    profileImage: {
      width: 65,
      height: 65,
      marginLeft: 15,
      borderRadius: 100,
      marginRight: 15,
    },
    cardItem: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    itemInfo: {
    },
    itemUserInfo: {
      flexDirection: 'row',
      marginBottom: 10,
      marginTop: 11,
    },
    nameText: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 17,
        marginTop: 2,
    },
    contentText: {
        fontSize: 14,
        color: '#878787',
    },
    authenticatedPatch: {
        width: 65,
        height: 22,
        backgroundColor: '#ff533a',
        borderRadius: 3,
        marginLeft: 9,
    },
    authenticatedText: {
        textAlign: 'center',
        paddingTop: 3,
        fontSize: 13,
        lineHeight: 16,
        letterSpacing: -0.5,
        color: '#ffffff'
    },
    imagePatch: {
      position: 'absolute',
      top: 45,
      left: 65,
      width: 15,
      height: 15,
      backgroundColor: '#ff533a',
      borderRadius: 100,
      borderWidth: 1.3,
      borderColor: '#ffffff',
      zIndex: 1,
    }
  });

  export default CardListItem;