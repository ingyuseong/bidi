import * as React from 'react';
import { Stack } from '../../../App';
import DesignerListScreen from '../../Screen/SearchTab/User/designerListScreen';
import DesignerDetailScreen from '../../Screen/SearchTab/User/designerDetailScreen';
import detailsScreen from '../../Screen/detailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const SearchStack = createStackNavigator();

function SearchTabScreen() {
  return (
    <Stack.Navigator>
      <SearchStack.Screen
        name="DesignerList"
        component={DesignerListScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="DesignerDetail"
        component={DesignerDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="search2"
        component={detailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SearchTabScreen;
