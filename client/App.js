import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import AuthStack from './src/Navigator/authStack';
import MainTabStack from './src/Navigator/mainTabStack';
import LandingScreen from './src/Screen/landingScreen';
import TopLeftBar from './src/Components/topLeftBar';
import TopRightBar from './src/Components/topRightBar';
import { View, Text, Button, Image } from 'react-native';
const Stack = createStackNavigator();

//뒤로 가기 버튼 Image 컴포넌트
// function BackBtn() {
//   return (
//     <View
//       // source={require('./src/back-btn.png')}
//       style={{marginLeft: 10, width: 22, height: 22}}
//     />
//   );
// }

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen
          name="MainTab"
          component={MainTabStack}
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerLeft: () => <TopLeftBar navigation={navigation} />,
            headerRight: (props) => <TopRightBar {...props} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { App, Stack };
