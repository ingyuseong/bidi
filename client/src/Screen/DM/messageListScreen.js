import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

// function DMListScreen({ users, navigation }) {
function DMListScreen({ navigation, route }) {

  const { params: { users } } = route;

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
      <ScrollView style={styles.matches} horizontal={true}>
      {/* <View style={styles.matches}> */}
        {/* <Button style={styles.matchItem} title='아이린'/> */}
        {/* <Button style={styles.matchItem} title='나연'/> */}
        {
          users.map((user, idx) => (
            // <Button style={styles.matchItem} title={user} key={idx}/>
            <View style={styles.matchItem} key={idx}>
              <Image source={user[0]} style={styles.matchItemImage} />
              <Text style={styles.matchItemText}>{user[1]}</Text>
            </View>
          ))
        }
      {/* </View> */}
      </ScrollView>
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
    margin: 5,
    borderRadius: 100,
  },
  matchItemText: {
    fontSize: 12,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
});
export default DMListScreen;