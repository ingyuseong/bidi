import * as React from 'react';
import { Stack } from '../../../../App';
import DesignerListScreen from '../../../Screen/01_FirstTab/Customer/designerListScreen';
import DesignerDetailScreen from '../../../Screen/01_FirstTab/Customer/designerDetailScreen';
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
    </Stack.Navigator>
  );
}

export default SearchTabScreen;
