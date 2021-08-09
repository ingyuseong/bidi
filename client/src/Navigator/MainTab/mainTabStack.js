import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { checkType } from '../../Lib/utils';
import UserTabStack from './userTabStack';
import DesignerTabStack from './designerTabStack';

function mainTabStack({ navigation }) {
  const [mode, setMode] = useState('');
  useEffect(() => {
    async function fetchMode() {
      const currentMode = await checkType();
      setMode(currentMode);
    }
    fetchMode();
  }, []);

  return mode == '' ? (
    <ActivityIndicator animating={mode} color="" size="large" />
  ) : mode == 'user' ? (
    <UserTabStack />
  ) : (
    <DesignerTabStack />
  );
}

export default mainTabStack;
