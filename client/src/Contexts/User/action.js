import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, GET_USER } from './constant';
import UserAPI from '../../Api/user';
import { createPromiseThunk } from '../Common/asyncUtils';

// export const registerUser = (body) => async (dispatch) => {
//   dispatch({ type: REGISTER_USER }); // 요청이 시작됨
//   try {
//     const user = await UserAPI.createUserAPI(body); // API 호출
//     dispatch({ type: REGISTER_USER_SUCCESS, user }); // 성공
//   } catch (e) {
//     dispatch({ type: REGISTER_USER_ERROR, error: e }); // 실패
//   }
// };

// export const registerUser = createPromiseThunk(REGISTER_USER, UserAPI.registerUser);
// export const registerUser = (payload) => ({ type: REGISTER_USER, payload });
export const registerUser = (payload) => ({ type: REGISTER_USER, payload });
export const getUser = (payload) => ({ type: GET_USER, payload });
