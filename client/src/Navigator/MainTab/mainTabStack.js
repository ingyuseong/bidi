import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { checkType } from '../../Lib/utils';
import UserTabStack from './userTabStack';
import DesignerTabStack from './designerTabStack';

function mainTabStack() {
  const [mode, setMode] = useState(null);
  useEffect(() => {
    async function fetchMode() {
      const currentMode = await checkType();
      setMode(currentMode);
    }
    fetchMode();
  }, []);

  return mode ? <UserTabStack /> : <DesignerTabStack />;
}

export default mainTabStack;
