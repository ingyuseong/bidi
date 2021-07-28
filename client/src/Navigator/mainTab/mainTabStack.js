import React, { useState, useEffect } from 'react';
import { checkType } from '../../Lib/utils';
import UserTabStack from './userTabStack';
import DesignerTabStack from './designerTabStack';

function mainTabStack() {
  const [mode, setMode] = useState(true);
  useEffect(async () => {
    (await checkType()) ? setMode(true) : setMode(false);
  }, []);
  return mode ? <UserTabStack /> : <DesignerTabStack />;
}

export default mainTabStack;
