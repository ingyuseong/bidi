import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';

// Temporary
import DaHyeon from '../../../public/img/DM/dahyeon.jpeg'

import ChatBubble from './chatBubble';

function ChatBubbleList({ messages }) {
    return (
        <ScrollView style={styles.messageContainer}>
          <View style={styles.chatDateContainer}>
            <Text style={styles.chatDate}>7월 15일 오전 8:44</Text>
          </View>
          {
            messages.map((message, idx) => (
                <ChatBubble message={message} key={idx} />
            ))
          }
          <Image source={DaHyeon} style={styles.checkPointImage} />
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        width: '100%',
    },
    chatDateContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
    },
    chatDate: {
        color: '#878787',
        fontSize: 11,
        lineHeight: 22,
    },
    checkPointImage: {
        position: 'absolute',
        top: 240,
        left: 10,
        width: 24,
        height: 24,
        borderRadius: 100,
    }
  });

  export default ChatBubbleList;