import axios, {InternalAxiosRequestConfig} from 'axios';
import store from '../../redux/store';
import {DEV_BASE_URL} from '../constant';

export const api = axios.create({
  baseURL: DEV_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const payLoad = store.getState();

  if (payLoad.auth.accessToken) {
    const accessToken = payLoad.auth.accessToken;
    config.headers['accessToken'] = accessToken;
  }
  return config;
});
