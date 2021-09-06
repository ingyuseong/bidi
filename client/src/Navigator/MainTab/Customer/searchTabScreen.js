import * as React from 'react';
import { Stack } from '../../../../App';
import DesignerListScreen from '../../../Screen/01_FirstTab/User/designerListScreen';
import DesignerDetailScreen from '../../../Screen/01_FirstTab/User/designerDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import CommonHeader from '../../../Components/HeaderBar/commonHeader';

const SearchStack = createStackNavigator();

function SearchTabScreen() {
  return (
    <Stack.Navigator>
      <SearchStack.Screen
        name="DesignerList"
        component={DesignerListScreen}
        options={CommonHeader}
      />
      <SearchStack.Screen
        name="DesignerDetail"
        component={DesignerDetailScreen}
        options={CommonHeader}
      />
    </Stack.Navigator>
  );
}

export default SearchTabScreen;
