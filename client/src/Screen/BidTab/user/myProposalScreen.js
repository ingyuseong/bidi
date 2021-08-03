import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import UserInfo from '../../../Components/User/userInfo';

function MyProposalScreen({ navigation, proposal, userInfo }) {
  return (
    <View style={styles.container}>
      {proposal != null ? (
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={{
              uri: proposal.before_src,
            }}
          />
          <UserInfo info={userInfo} keywords={proposal.keywords} />
        </View>
      ) : (
        <Text>not yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    width: '100%',
    height: '50%',
    borderWidth: 1,
    borderColor: 'rgb(243,243,243)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default MyProposalScreen;
