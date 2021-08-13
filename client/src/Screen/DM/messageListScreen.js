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

import CardList from '../../Components/DM/cardList';

function DMListScreen({ navigation, route }) {

  const [query, setQuery] = useState('');

  const { params: { users, messages } } = route;

  // Header style configuration
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: 'black',
      headerBackTitle: ' ',
    }, [navigation]);
  });


  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.headerText}>새로운 매치</Text>
      </View>

      <ScrollView style={styles.matches} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          users.map((user, idx) => (
            <TouchableOpacity
              style={styles.matchItem}
              onPress={() => {
                navigation.navigate('DirectMessage', {
                  user: user,
                });
              }}
              key={idx}
            >
              <View style={user['new'] ? styles.matchNewItemImageContainer : styles.matchItemImageContainer}>
                <Image source={user['profile']} style={user['new'] ? styles.matchNewItemImage : styles.matchItemImage} />
              </View>
              <Text style={styles.matchItemText}>{user['name']}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>

      <View styles={styles.searchBarContainer}>
        <TextInput
          value={query}
          style={styles.searchBar}
          onChangeText={setQuery}
          placeholder='검색'
        />
      </View>
      <View>
        <Text style={styles.headerText}>메세지</Text>
      </View>

      <CardList items={messages} navigation={navigation}/>
      
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
  messageList: {

  },
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
    alignItems: 'flex-start'
  },
  messageCardUserInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
export default DMListScreen;