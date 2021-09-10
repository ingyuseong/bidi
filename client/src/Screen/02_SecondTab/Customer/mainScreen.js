import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { objectNullChecking } from '../../../Lib/utils';

// Screens
import WaitMainScreen from './wait/waitMainScreen';
import MatchingMainScreen from './matching/matchingMainScreen';

// Components
import Loading from '../../../Components/Common/loading';

// Redux Action
import { getMatchingByCustomerId } from '../../../Contexts/Customer/Matching/action';

function MainScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const { data: matching, loading, error } = useSelector((state) => state.customerMatching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchingByCustomerId(user.id));
  }, [dispatch]);
  if (loading || error || !matching) {
    return <Loading />;
  } else if (!matching.length) {
    return <WaitMainScreen navigation={navigation} />;
  } else if (!matching[0].reserved) {
    return <MatchingMainScreen navigation={navigation} />;
  } else navigation.replace('Reserved');
}
export default MainScreen;
