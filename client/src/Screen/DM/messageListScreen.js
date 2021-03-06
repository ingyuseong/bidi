import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';
import CardList from '../../Components/DM/cardList';

import { JOIN_ROOM, NEW_CHAT_MESSAGE_EVENT, LEAVE_ROOM } from '../../Lib/socket/types/socket-types';
import { joinRoom, createMessage, leaveRoom } from '../../Lib/socket/emits/socket';

import socket from '../../Lib/socket/socketIO';

function DMListScreen({ navigation, route }) {
  const [query, setQuery] = useState('');
  const [roomInfo, setRoomInfo] = useState([]);

  const {
    params: { users, messages },
  } = route;

  const getLatestMessage = async (room) => {
    return await fetch('http://127.0.0.1:3000' + `/api/message/latest/${room.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Successfully get latest message by Room ID');
        return result.data;
      })
      .catch((err) => {
        console.log('Failed to get latest message by Room ID');
        return err;
      });
  };

  const getRoomInfo = async (user) => {
    const userType = user.type === '일반 사용자' ? 'customer' : 'designer';
    return await fetch('http://127.0.0.1:3000' + `/api/room/${userType}/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(async (result) => {
        console.log('Successfully get RoomInfo by User ID');
        console.log(result.data);
        return await Promise.all(
          result.data.roomList.map(async (room) => {
            const latestMessage = await getLatestMessage(room);
            const latestMessageContent = latestMessage.latestMessage.length
              ? latestMessage.latestMessage[0].content
              : '';
            return {
              ...room,
              latestMessage: latestMessageContent,
            };
          }),
        );
      })
      .then((result) => {
        console.log('Successfully add Latest Message into RoomInfo');
        setRoomInfo(result);
      })
      .catch((err) => {
        console.log('Latest Message Failed');
      });
  };
  // setRoomInfo(result.data.roomList)

  // Header style configuration
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: '',
        headerTintColor: 'black',
        headerBackTitle: ' ',
      },
      [navigation],
    );
  });

  useEffect(() => {
    const fetchMode = async () => {
      const user = await BidiStorage.getData(STORAGE_KEY);
      getRoomInfo(user);
    };
    fetchMode();
  }, []);

  // socket.io: Join/Leave Rooms
  useEffect(() => {
    if (roomInfo.length) {
      for (room of roomInfo) {
        joinRoom(room.id);
      }
      socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        nextRoomInfo = roomInfo.map((room) => {
          return room.id === message.roomId
            ? {
                ...room,
                latestMessage: message.content,
              }
            : {
                ...room,
              };
        });
        setRoomInfo(nextRoomInfo);
      });
    }
    return () => {
      if (roomInfo.length) {
        for (room of roomInfo) {
          leaveRoom(room.id);
        }
      }
    };
  }, [roomInfo]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>새로운 매치</Text>
      </View>

      <ScrollView style={styles.matches} horizontal={true} showsHorizontalScrollIndicator={false}>
        {roomInfo.map((room, idx) => (
          <TouchableOpacity
            style={styles.matchItem}
            onPress={async () => {
              navigation.navigate('DirectMessage', {
                room: room,
                user: await BidiStorage.getData(STORAGE_KEY),
              });
            }}
            key={idx}>
            <View
              style={
                room.unread_desinger
                  ? styles.matchItemImageContainer
                  : styles.matchNewItemImageContainer
              }>
              <Image
                source={{ uri: room.user.img_src }}
                style={room.unread_desinger ? styles.matchNewItemImage : styles.matchItemImage}
              />
            </View>
            <Text style={styles.matchItemText}>{room.user.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View styles={styles.searchBarContainer}>
        <TextInput
          value={query}
          style={styles.searchBar}
          onChangeText={setQuery}
          placeholder="검색"
        />
      </View>
      <View>
        <Text style={styles.headerText}>메세지</Text>
      </View>

      <CardList items={roomInfo} navigation={navigation} />

      {/* <View style={{backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: '100%', height: '43%', }}>
        <Text style={styles.emptyText}>아직 메세지가 없습니다.</Text>
      </View>
      <View style={{backgroundColor: '#ffffff', width: '100%', height: '20%'}} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  emptyText: {
    textAlign: 'center',
    padding: 17,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 19,
    color: '#878787',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerText: {
    textAlign: 'left',
    padding: 17,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.5,
  },
  matches: {
    // flex: 1, // Q. 왜 넣으면 쭉 내려갈까?
    width: '100%',
    // height: 70,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },
  matchItem: {
    padding: 10,
  },
  matchItemImage: {
    width: 65,
    height: 65,
    margin: 2,
    borderRadius: 100,
  },
  matchItemImageContainer: {
    borderRadius: 100,
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 2,
    padding: 0,
  },
  matchNewItemImage: {
    width: 65,
    height: 65,
    margin: 2,
    borderRadius: 100,
    // borderColor: '#ff533a',
    // borderStyle: 'solid',
    // borderWidth: 2,
  },
  matchNewItemImageContainer: {
    borderRadius: 100,
    borderColor: '#ff533a',
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 2,
    padding: 0,
  },
  matchItemText: {
    fontSize: 12,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
  searchBarContainer: {
    flex: 1,
  },
  searchBar: {
    width: 356,
    height: 40,
    margin: 15,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    padding: 13,
  },
  messageList: {},
  messageProfileImage: {
    width: 65,
    height: 65,
    margin: 2,
    borderRadius: 100,
    marginRight: 15,
  },
  messageCard: {
    width: '100%',
    flexDirection: 'row',
  },
  messageCardInfo: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  messageCardUserInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default DMListScreen;
