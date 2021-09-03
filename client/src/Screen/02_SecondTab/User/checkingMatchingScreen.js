import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Redux Action
import { getMatchingByCustomerId } from '../../../Contexts/Matching/action';

const Tab = createMaterialTopTabNavigator();

function CheckingMatchingScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const { data: matching } = useSelector((state) => state.matching);
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchMode() {
      await dispatch(getMatchingByCustomerId(user.id));
      if (matching && matching.length > 0) {
        setAnimating(false);
        navigation.replace('process');
      } else {
        setAnimating(false);
        navigation.replace('wait');
      }
    }
    fetchMode();
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color=""
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 60,
  },
});

export default CheckingMatchingScreen;
