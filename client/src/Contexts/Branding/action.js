import {
  GET_BRANDING_LIST,
  REGISTER_BRANDING,
  PATCH_BRANDING,
  DELETE_BRANDING,
  GET_BRANDING_LIST_DESIGNER,
} from './constant';
import BrandingAPI from '../../Api/branding';
import { createPromiseThunk } from '../Common/asyncUtils';

export const registerBranding = (payload) => ({ type: REGISTER_BRANDING, payload });
export const patchBranding = (id, payload) => ({ type: PATCH_BRANDING, id, payload });
export const deleteBranding = (id) => ({ type: DELETE_BRANDING, id });
export const getBrandingList = createPromiseThunk(GET_BRANDING_LIST, BrandingAPI.getBrandingList);
export const getBrandingListByDesignerId = createPromiseThunk(
  GET_BRANDING_LIST_DESIGNER,
  BrandingAPI.getBrandingListByDesignerId,
);
