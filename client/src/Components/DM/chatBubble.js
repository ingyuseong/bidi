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

function ChatBubble({ message }) {

    return (
        <View style={message.customerSent ? styles.customerTextContainer : styles.desginerTextContainer} >
            <Text style={message.customerSent ? styles.customerText : styles.designerText}>{message.content}</Text>
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
    designerText: {
        marginLeft: 40,
        marginTop: 10,
        maxWidth: '70%',
        textAlign: 'left',
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dbdbdb',
        borderRadius: 22,
        lineHeight: 22,
    },
    customerText: {
        marginRight: 10,
        marginTop: 10,
        maxWidth: '70%',
        textAlign: 'right',
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ffffff',
        backgroundColor: '#efefef',
        borderRadius: 22,
        lineHeight: 22,
        backfaceVisibility: 'hidden',
      },
  });

  export default ChatBubble;