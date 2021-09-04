import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { objectNullChecking } from '../../../Lib/utils';

// Screens
import WaitMainScreen from './waitMatching/waitMainScreen';
import MatchingMainScreen from './processMatching/matchingMainScreen';

// Components
import Loading from '../../../Components/Common/loading';

// Redux Action
import { getMatchingByCustomerId } from '../../../Contexts/Matching/action';

const Tab = createMaterialTopTabNavigator();

function CheckingMatchingScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const { data: matching, loading, error } = useSelector((state) => state.matching);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchingByCustomerId(user.id));
  }, [dispatch]);
  if (loading || error) return <Loading loading />;
  return (
    <>
      {objectNullChecking(matching) ? (
        <MatchingMainScreen navigation={navigation} />
      ) : (
        <WaitMainScreen navigation={navigation} />
      )}
    </>
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
