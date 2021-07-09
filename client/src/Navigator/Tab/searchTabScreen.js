import * as React from 'react';
import { Stack } from '../../../App'
import biidScreen from '../../Screen/biidScreen'
import detailsScreen from '../../Screen/detailScreen'
import {createStackNavigator} from '@react-navigation/stack';

const SearchStack = createStackNavigator();

function SearchTabScreen () {
    return (
      <Stack.Navigator>
        <SearchStack.Screen name="search1" component={biidScreen} />
        <SearchStack.Screen name="search2" component={detailsScreen} />
      </Stack.Navigator>
    );
  };

export default SearchTabScreen;