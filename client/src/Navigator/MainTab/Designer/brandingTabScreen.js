import React, { useState, useEffect } from 'react';
import { Stack } from '../../../../App';
import { createStackNavigator } from '@react-navigation/stack';

import CommonHeader from '../../../Components/HeaderBar/commonHeader';
import DetailHeader from '../../../Components/HeaderBar/detailHeader';

import BrandingMainScreen from '../../../Screen/03_ThirdTab/Designer/brandingMainScreen';

import CreateBrandingScreen from '../../../Screen/03_ThirdTab/Designer/createBrandingScreen';
import DetailBrandingScreen from '../../../Screen/03_ThirdTab/Designer/detailBrandingScreen';
import EditBrandingScreen from '../../../Screen/03_ThirdTab/Designer/editBrandingScreen';

import CreateStyleBookScreen from '../../../Screen/03_ThirdTab/Designer/createStyleBookScreen';
import DetailStyleBookScreen from '../../../Screen/03_ThirdTab/Designer/deatailStyleBookScreen';
import EditStyleBookScreen from '../../../Screen/03_ThirdTab/Designer/editStyleBookScreen';

const BrandingStack = createStackNavigator();

function BrandingTabScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <BrandingStack.Screen
        name="BrandingMain"
        component={BrandingMainScreen}
        options={CommonHeader}
      />
      <BrandingStack.Screen
        name="CreateBranding"
        component={CreateBrandingScreen}
        options={{ ...DetailHeader, title: '포트폴리오 등록' }}
      />
      <BrandingStack.Screen
        name="DetailBranding"
        component={DetailBrandingScreen}
        options={{ ...DetailHeader, title: '포트폴리오 상세 페이지' }}
      />
      <BrandingStack.Screen
        name="EditBranding"
        component={EditBrandingScreen}
        options={{ ...DetailHeader, title: '포트폴리오 수정 페이지' }}
      />
      <BrandingStack.Screen
        name="CreateStyleBook"
        component={CreateStyleBookScreen}
        options={{ ...DetailHeader, title: '스타일북 등록' }}
      />
      <BrandingStack.Screen
        name="DetailStyleBook"
        component={DetailStyleBookScreen}
        options={{ ...DetailHeader, title: '스타일북 상세 페이지' }}
      />
      <BrandingStack.Screen
        name="EditStyleBook"
        component={EditStyleBookScreen}
        options={{ ...DetailHeader, title: '스타일북 수정 페이지' }}
      />
    </Stack.Navigator>
  );
}

export default BrandingTabScreen;
