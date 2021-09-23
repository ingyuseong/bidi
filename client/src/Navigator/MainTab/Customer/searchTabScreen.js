import * as React from 'react';
import { Stack } from '../../../../App';

import { createStackNavigator } from '@react-navigation/stack';

import CommonHeader from '../../../Components/HeaderBar/commonHeader';
import DetailHeader from '../../../Components/HeaderBar/detailHeader';
import findAddressHeader from '../../../Components/HeaderBar/findAddressHeader';

import DesignerListScreen from '../../../Screen/01_FirstTab/Customer/designerListScreen';
import DesignerDetailScreen from '../../../Screen/01_FirstTab/Customer/designerDetailScreen';
import AddressSettingScreen from '../../../Screen/01_FirstTab/Customer/addressSettingScreen';
import FindAddressScreen from '../../../Screen/01_FirstTab/Customer/findAddressScreen';

const SearchStack = createStackNavigator();

function SearchTabScreen() {
  return (
    <Stack.Navigator>
      <SearchStack.Screen
        name="DesignerList"
        component={DesignerListScreen}
        options={findAddressHeader}
      />
      <SearchStack.Screen
        name="DesignerDetail"
        component={DesignerDetailScreen}
        options={CommonHeader}
      />
      <SearchStack.Screen
        name="AddressSetting"
        component={AddressSettingScreen}
        options={{ ...DetailHeader, title: '주소 설정' }}
      />
      <SearchStack.Screen
        name="FindAddress"
        component={FindAddressScreen}
        options={{ ...DetailHeader, title: '도로명 주소 설정' }}
      />
    </Stack.Navigator>
  );
}

export default SearchTabScreen;
