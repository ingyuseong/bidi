import { API, formAPI } from './common';

const BrandingAPI = {
  registerBranding: async (body) => {
    return await formAPI('/branding/register', 'post', body);
  },
  getBrandingList: async () => {
    return await API('/branding/list', 'get');
  },
};
export default BrandingAPI;
