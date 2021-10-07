import React from 'react';

import AddressBar from './addressBar';
import TopRightBar from './topRightBar';

const FindAddressHeader = ({ navigation, route }) => ({
  headerStyle: {
    height: 100,
    backgroundColor: '',
  },
  headerLeft: () => <AddressBar navigation={navigation} />,
  headerRight: () => <TopRightBar navigation={navigation} />,
  title: '',
});

export default FindAddressHeader;
