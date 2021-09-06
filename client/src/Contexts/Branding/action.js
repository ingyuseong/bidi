import {
  GET_BRANDING_LIST,
  REGISTER_BRANDING,
  PATCH_BRANDING,
  PATCH_MAIN_BRANDING,
  DELETE_BRANDING,
  GET_BRANDING_LIST_DESIGNER,
  GET_MAIN_BRANDING_DESIGNER,
} from './constant';
import BrandingAPI from '../../Api/branding';
import { createPromiseThunk } from '../Common/asyncUtils';

export const registerBranding = (payload) => ({ type: REGISTER_BRANDING, payload });
export const patchBranding = (id, payload) => ({ type: PATCH_BRANDING, id, payload });
export const patchMainBranding = (id) => ({ type: PATCH_MAIN_BRANDING, id });
export const deleteBranding = (id) => ({ type: DELETE_BRANDING, id });
export const getBrandingList = createPromiseThunk(GET_BRANDING_LIST, BrandingAPI.getBrandingList);
export const getBrandingListByDesignerId = createPromiseThunk(
  GET_BRANDING_LIST_DESIGNER,
  BrandingAPI.getBrandingListByDesignerId,
);
export const getMainBrandingByDesignerId = createPromiseThunk(
  GET_MAIN_BRANDING_DESIGNER,
  BrandingAPI.getMainBrandingByDesignerId,
);
