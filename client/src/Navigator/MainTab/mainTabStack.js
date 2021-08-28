import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserAPI from '../../Api/user';
import BidiStorage from '../../Lib/storage';
import { STORAGE_KEY } from '../../Lib/constant';
import { registerUser } from '../../Contexts/User';

import UserTabStack from './userTabStack';
import DesignerTabStack from './designerTabStack';
import Loading from '../../Components/Common/loading';

function mainTabStack({ navigation }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user) || {
    loading: false,
    data: null,
    error: null,
  };
  useEffect(() => {
    async function fetchMode() {
      const { token } = await BidiStorage.getData(STORAGE_KEY);
      if (!data) {
        const response = await UserAPI.checkToken(token);
        if (response) {
          dispatch(registerUser(response));
        }
      }
    }
    fetchMode();
  }, []);
  if (loading || !data) {
    return <Loading loading />;
  }
  if (data) {
    const { user_type } = data;
    return user_type == 'customer' ? <UserTabStack /> : <DesignerTabStack />;
  }
}

export default mainTabStack;
