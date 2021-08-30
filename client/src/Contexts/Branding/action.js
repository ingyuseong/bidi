import BrandingAPI from '../../Api/branding';
import { GET_BRANDING_LIST_DESIGNER } from './constant';
import { createPromiseThunk } from '../Common/asyncUtils';
// export const registerUser = () => async (dispatch) => {
//   dispatch({ type: REGISTER_USER }); // 요청이 시작됨
//   try {
//     const user = await UserAPI.createUserAPI(); // API 호출
//     dispatch({ type: REGISTER_USER_SUCCESS, user }); // 성공
//   } catch (e) {
//     dispatch({ type: REGISTER_USER_ERROR, error: e }); // 실패
//   }
// };

export const getBrandingListByDesignerId = createPromiseThunk(
  GET_BRANDING_LIST_DESIGNER,
  BrandingAPI.getBrandingListByDesignerId,
);
