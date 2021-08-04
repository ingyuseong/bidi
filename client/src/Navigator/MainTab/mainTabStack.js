import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { checkType } from '../../Lib/utils';
import UserTabStack from './userTabStack';
import DesignerTabStack from './designerTabStack';

function mainTabStack() {
  const [mode, setMode] = useState('');
  useEffect(() => {
    async function fetchMode() {
      const currentMode = await checkType();
      setMode(currentMode);
    }
    fetchMode();
  }, []);
  return mode == '' ? <Text>asdf</Text> : mode == 'user' ? <UserTabStack /> : <DesignerTabStack />;
}

export default mainTabStack;
