import React from 'react';
import TopLeftBar from './topLeftBar';
import TopRightBar from './topRightBar';

const CommonHeader = ({ navigation, route }) => ({
  headerStyle: {
    height: 100,
  },
  headerLeft: () => <TopLeftBar navigation={navigation} />,
  headerRight: () => <TopRightBar navigation={navigation} />,
  title: '',
});
export default CommonHeader;
