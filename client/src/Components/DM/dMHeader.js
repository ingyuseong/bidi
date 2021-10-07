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

// import Ionicons from 'react-native-vector-icons/dist/Ionicons';

function DMHeader({ navigation, user }) {

    return (
        <TouchableOpacity
          style={styles.designerInfo}
          // Designer detail(개인 브랜딩 페이지)로 navigate
          // onPress={}
          >
          <Image source={{uri: user.img_src}} style={styles.profileImage} />
          <View style={styles.designerTextInfo}>
              <Text style={styles.nameText}>{user.name}</Text>
              <Text style={styles.belongText}>{`@${user['belong']}`}</Text>
          </View>
          <View>
          </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    profileImage: {
      width: 40,
      height: 40,
      // marginLeft: 15,
      borderRadius: 100,
      // marginRight: 15,
    },
    designerInfo: {
      flex: 1,
      width: 300,
      alignItems: 'center',
      flexDirection: 'row',
    },
    designerTextInfo: {
      flexDirection: 'column',
      marginLeft: 10,
    },
    nameText: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 17,
        textAlign: 'left',
        marginBottom: 5,
    },
    belongText: {
        fontSize: 12,
        color: '#878787',
        lineHeight: 14,
        textAlign: 'left',
    },
  });

  export default DMHeader;