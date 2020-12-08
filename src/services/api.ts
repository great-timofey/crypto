import axios, { AxiosError, AxiosResponse, Method } from 'axios';

import { API_URL, DEV_DOMAIN, PROD_DOMAIN, APP_ID, API_VERSION } from './config';

import { appStore } from '$redux/store';
import { authActions } from '$redux/auth/';
import { profileActions } from '$redux/profile/index';
import { camelCaseObject, snakeCaseObject } from '$global/utils';
// import schema from './schema';

let devMode = false;

export function requestChangeApiDevMode(value: boolean) {
  devMode = value;
}

export const NarfexApi = axios.create({
  timeout: 12000,
  baseURL: API_URL,
});

NarfexApi.interceptors.request.use(async (config) => {
  return {
    ...config,
    baseURL: `https://${devMode ? DEV_DOMAIN : PROD_DOMAIN}/api/v${API_VERSION}/`,
  };
});

export const api = (
  scheme: {
    path: string;
    method: Method | string;
    name?: string;
    params?: any;
  },
  params?: any,
) => {
  const path = scheme.path.replace('%n:id', params?.id); // HACK TODO
  console.log(`REQUEST: (${path})`, params);
  const { auth } = appStore.getState();
  return NarfexApi.request({
    method: scheme.method as Method,
    url: path,
    headers: {
      'X-Token': auth.accessToken || '',
      'X-APP-ID': APP_ID,
    },
    params: snakeCaseObject(params),
  })
    .then((response: AxiosResponse) => {
      console.log(`RESPONSE (${path}): `, response.data);
      const authToken = response.headers['auth-token'];
      if (authToken) {
        appStore.dispatch(authActions.setAccessToken(authToken));
      }
      if (typeof response.data !== 'object' || response.data.error) {
        throw Error(response.data?.error || 'Server error');
      }
      return camelCaseObject(response.data);
    })
    .catch((error: AxiosError) => {
      console.log(`Error RESPONSE (${path}): `, error.response);
      if (error.code === 'ECONNABORTED') {
        error.message = 'Waiting limit exceeded';
        throw error;
      } else if (error.response?.status === 403) {
        appStore.dispatch(authActions.clearAuthData());
        appStore.dispatch(profileActions.clearUser());
        error.message = 'Forbidden: Auth required';
        throw error;
      } else if (error?.response?.data) {
        error.code = error.response.data.code;
        error.message = error.response.data.message || 'Unknown error';
        throw error;
      } else {
        error.message = error.message || 'Connection error';
        throw error;
      }
    });
};
