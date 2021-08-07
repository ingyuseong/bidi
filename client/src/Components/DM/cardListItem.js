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

function CardListItem({ navigation, item }) {

    return (
        <TouchableOpacity
          style={styles.cardItem}
          onPress={() => {
            navigation.navigate('DirectMessage', {
                userName: item['name']
            })
          }}
        >
            <Image source={item['profile']} style={styles.profileImage} />
            <View style={styles.itemInfo}>
            <View style={styles.itemUserInfo}>
                <Text style={styles.nameText}>{item['name']}</Text>
                {
                    item['authenticated'] &&
                    <View style={styles.authenticatedPatch}>
                        <Text style={styles.authenticatedText}>인증 완료</Text>
                    </View>
                }
            </View>
            <View>
                <Text style={styles.contentText}>{item['content']}</Text>
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
    }
  });

  export default CardListItem;