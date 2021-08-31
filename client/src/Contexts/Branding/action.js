import { GET_BRANDING_LIST } from './constant';
import BrandingAPI from '../../Api/branding';
import { createPromiseThunk } from '../Common/asyncUtils';

export const getBrandingList = createPromiseThunk(GET_BRANDING_LIST, BrandingAPI.getBrandingList);
