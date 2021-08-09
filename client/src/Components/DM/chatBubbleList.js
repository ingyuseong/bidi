import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';



import ChatBubble from './chatBubble';

function ChatBubbleList({ messages }) {
    return (
        <ScrollView
          style={styles.messageContainer}
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
        >
          <View style={styles.chatDateContainer}>
            <Text style={styles.chatDate}>7월 15일 오전 8:44</Text>
          </View>
          {
            messages.map((message, idx) => (
                <ChatBubble message={message} ckpt={idx === 2} key={idx} />
            ))
          }
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
  });

  export default ChatBubbleList;