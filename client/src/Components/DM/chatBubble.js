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

// Temporary
import DaHyeon from '../../../public/img/DM/dahyeon.jpeg'

function ChatBubble({ message, ckpt }) {

    return (
        <View style={message.customerSent ? styles.customerTextContainer : styles.desginerTextContainer} >
          { ckpt && <Image source={DaHyeon} style={styles.checkPointImage} />}
          <View style={message.customerSent ? styles.customerTextBorder : styles.designerTextBorder}>
            <Text style={message.customerSent ? styles.customerText : styles.designerText}>{message.content}</Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    desginerTextContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },
    customerTextContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    designerTextBorder: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dbdbdb',
        borderRadius: 22,
        marginLeft: 40,
        marginTop: 10,
        maxWidth: '70%',
    },
    customerTextBorder: {
        marginRight: 10,
        marginTop: 10,
        maxWidth: '70%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ffffff',
        backgroundColor: '#efefef',
        borderRadius: 22,
    },
    designerText: {
        lineHeight: 22,
        textAlign: 'left',
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    customerText: {
        textAlign: 'right',
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        lineHeight: 22,
      },
      checkPointImage: {
        position: 'absolute',
        top: '65%',
        left: 10,
        width: 24,
        height: 24,
        borderRadius: 100,
    }
  });

  export default ChatBubble;