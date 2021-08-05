import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

// function DMListScreen({ users, navigation }) {
function DMListScreen({ navigation, route }) {

  const [query, setQuery] = useState('');

  const { params: { users } } = route;

  // const matchItem = (user, idx) => {
  //     if (idx > 1) {
  //       return <Image source={user[0]} style={styles.matchItemImage />
  //     } else {
  //       return (
  //         <View style={styles.matchNewItemImageContainer}>
  //           <Image source={user[0]} style={styles.matchItemImage} />
  //         </View>)
  //     }
  // }

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
        <Text style={styles.matchText}>새로운 매치</Text>
      </View>
      <ScrollView style={styles.matches} horizontal={true} showsHorizontalScrollIndicator={false}>
      {/* <View style={styles.matches}> */}
        {/* <Button style={styles.matchItem} title='아이린'/> */}
        {/* <Button style={styles.matchItem} title='나연'/> */}
        {
          users.map((user, idx) => (
            // <Button style={styles.matchItem} title={user} key={idx}/>
            <View style={styles.matchItem} key={idx}>
              <View style={idx > 1 ? styles.matchItemImageContainer : styles.matchNewItemImageContainer}>
                <Image source={user[0]} style={idx > 1 ? styles.matchItemImage : styles.matchNewItemImage} />
              </View>
              <Text style={styles.matchItemText}>{user[1]}</Text>
            </View>
          ))
        }
      {/* </View> */}
      </ScrollView>
      <View styles={styles.searchBarContainer}>
        <TextInput
          value={query}
          style={styles.searchBar}
          onChangeText={setQuery}
          placeholder='검색'
        />
      </View>
      <View style={{backgroundColor: 'white', width: '100%', height: '71%'}}/>
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
  matchText: {
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
    margin: 1,
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
    margin: 1,
    padding: 0,
  },
  matchItemText: {
    fontSize: 12,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
  searchBarContainer: {
    flex: 1
  },
  searchBar: {
    width: 356,
    height: 40,
    margin: 15,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    padding: 13,
  }
});
export default DMListScreen;