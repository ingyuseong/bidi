import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailHeader = {
  title: '비드 작성',
  headerBackTitle: '',
  headerBackTitleVisible: false,
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerBackImage: () => <Icon name="chevron-back" size={30} style={styles.icon} />,
};

const styles = StyleSheet.create({
  icon: {},
});

export default DetailHeader;
