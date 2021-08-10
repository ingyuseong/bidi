import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './src/Screen/landingScreen';
import AuthStack from './src/Navigator/Auth/authStack';

import TopLeftBar from './src/Components/HeaderBar/topLeftBar';
import TopRightBar from './src/Components/HeaderBar/topRightBar';

import MainTabStack from './src/Navigator/MainTab/mainTabStack';

import MypageScreen from './src/Screen/05_MypageTab/mypageScreen';
// import MainScreen from './src/Screen/mainScreen'

const navTheme = DefaultTheme;
navTheme.colors.background = 'white';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: 'white',
            height: 100,
          },
          headerLeft: () => <TopLeftBar navigation={navigation} />,
          headerRight: () => <TopRightBar navigation={navigation} />,
        })}>
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />

        {/* 상단 헤더 관련 스크린 */}
        {/* <Stack.Screen name="Main" component={MainScreen}/> */}
        <Stack.Screen name="Mypage" component={MypageScreen} />

        {/*메인 탭 Navigation*/}
        <Stack.Screen name="MainTab" component={MainTabStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { App, Stack };
