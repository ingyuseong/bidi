import React from 'react';
import { AppRegistry } from 'react-native';
import { App } from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import globalStore from './src/Contexts/Common/globalStore';
const store = globalStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
