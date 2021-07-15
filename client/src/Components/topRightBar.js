import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopRightBar = ({ navigation, route }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
      <View style={styles.container}>
          <Icon name="user-circle" size={17} color="#eb5f48" />
          <Text style={styles.userName}>User</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop:15,
    marginRight:10
  },
  userName: {
    marginLeft: 6,
    fontSize: 15,
    color: '#7f7f7f'
  }
});
export default TopRightBar;
