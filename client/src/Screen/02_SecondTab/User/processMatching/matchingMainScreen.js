import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

// Components
import MatchingWaitScreen from './matchingWaitScreen';

function MatchingMainScreen({ navigation, matching }) {
  const [imageToggle, setImageToggle] = useState(false);
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>매칭 정보</Text>
      </View>
      {matching.reserved ? (
        <Text>asdf</Text>
      ) : (
        <MatchingWaitScreen navigation={navigation} matching={matching} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ECEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
});

export default MatchingMainScreen;
