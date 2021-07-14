import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './src/Navigator/authStack';
import MainTabStack from './src/Navigator/mainTabStack';
import LandingScreen from './src/Screen/landingScreen';
import MypageScreen from './src/Screen/mypageScreen';
import TopLeftBar from './src/Components/topLeftBar';
import TopRightBar from './src/Components/topRightBar';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen name="Mypage" component={MypageScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="MainTab"
          component={MainTabStack}
          options={({ navigation }) => ({
            title: '',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerLeft: () => <TopLeftBar navigation={navigation} />,
            headerRight: () => <TopRightBar navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { App, Stack };
