import * as React from 'react';
import LoginScreen from '../Screen/Auth/loginScreen';
import RegisterScreen from '../Screen/Auth/registerScreen';
import { Stack } from '../../App';

function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          // headerBackImage: BackBtn,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          // headerBackImage: BackBtn,
        }}
      />
    </Stack.Navigator>
  );
}

export default Auth;
