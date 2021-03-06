import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserAPI from '../../Api/user';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';
import { registerUser } from '../../Contexts/User';

import UserTabStack from './customerTabStack';
import DesignerTabStack from './designerTabStack';
import Loading from '../../Components/Common/loading';

function mainTabStack({ navigation }) {
  const { data, loading, error } = useSelector((state) => state.user);
  if (loading || !data) return <Loading />;
  if (data) {
    const { user_type } = data;
    return user_type == 'customer' ? <UserTabStack /> : <DesignerTabStack />;
  }
}

export default mainTabStack;
