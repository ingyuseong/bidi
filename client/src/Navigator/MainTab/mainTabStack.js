import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, View, Text } from 'react-native';
import UserTabStack from './userTabStack';
import DesignerTabStack from './designerTabStack';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';
import { checkToken } from '../../Contexts/User/action';

function mainTabStack({ navigation }) {
  const { data, loading, error } = useSelector((state) => state.user) || {
    loading: false,
    data: null,
    error: null,
  };
  if (loading || !data) {
    return <ActivityIndicator animating={loading} color="" size="large" />;
  }
  if (data) {
    const { user_type } = data;
    return user_type == 'customer' ? <UserTabStack /> : <DesignerTabStack />;
  }
}

export default mainTabStack;
