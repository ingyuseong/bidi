import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function TopRightBar({ navigation, route }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Mypage')}>
        <Icon name="bell-o" size={25} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('DM')}>
        <Icon name="send-o" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
});
export default TopRightBar;
