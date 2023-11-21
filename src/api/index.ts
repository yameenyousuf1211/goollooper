import {api} from './utils/interceptor';

export const login = async (values: any) => {
  const response = await api.post(`auth/login`, values);
  return response;
};

export const register = async (values: any) => {
  const response = await api.post(`auth/register`, values);
  return response;
};

export const getOtpCode = async (value: any) => {
  const response = await api.post(`auth/send-code`, value);
  return response;
};

export const verifyCode = async (code: number) => {
  const response = await api.put(`auth/verify-code`, {
    code: code.toString(),
  });
  return response;
};

export const resetPassword = async (values: any) => {
  const response = await api.put(`auth/reset-password`, values);
  return response;
};
