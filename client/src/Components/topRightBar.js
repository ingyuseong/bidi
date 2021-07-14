import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopRightBar = ({ navigation, route }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
      <View style={styles.container}>
        <Text>
          <Icon name="user-circle" size={30} color="#900" />;
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default TopRightBar;
