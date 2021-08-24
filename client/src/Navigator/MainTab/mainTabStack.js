import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { checkType } from '../../Lib/utils';
import UserTabStack from './userTabStack';
import DesignerTabStack from './designerTabStack';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';
import { useSelector } from 'react-redux';

function mainTabStack({ navigation }) {
  const [mode, setMode] = useState('');
  const { data, loading, error } = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    async function fetchMode() {
      const { user_type } = await BidiStorage.getData(STORAGE_KEY);
      const currentMode = await checkType(user_type);
      console.log(user_type, currentMode);
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
