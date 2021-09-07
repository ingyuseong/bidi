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

function CheckingMatchingScreen({ navigation }) {
  const { data: user } = useSelector((state) => state.user);
  const { data: matching, loading, error } = useSelector((state) => state.matching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchingByCustomerId(user.id));
  }, [dispatch]);
  if (loading || error || !matching) return <Loading loading />;
  return (
    <View style={{ flex: 1 }}>
      {matching && matching.length > 0 ? (
        <MatchingMainScreen navigation={navigation} matching={matching[0]} />
      ) : (
        <WaitMainScreen navigation={navigation} />
      )}
    </View>
  );
}
export default CheckingMatchingScreen;
