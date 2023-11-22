import {IUser} from '../interfaces/user.interface';
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

// getting volunter services

export const getServices = async () => {
  const response = await api.get('service');
  return response;
};

export const updateProfile = async (userData: IUser) => {
  let formData = new FormData();
  formData.append('firstName', userData?.firstName);
  formData.append('lastName', userData?.lastName);
  formData.append('userName', userData?.userName);
  // formData.append('about', userData?.about);
  // formData.append('phone', userData.phone);
  // formData.append('age', Number(userData.age));
  formData.append('gender', userData?.gender?.toLowerCase());
  // formData.append('volunteer', userData?.volunteer);

  const response = await api.put(`user/${userData?._id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
