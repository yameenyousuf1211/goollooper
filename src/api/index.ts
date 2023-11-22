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

// getting subscriptions
export const getSubscriptions = async () => {
  const response = await api.get('subscription');
  return response;
};
// check username
export const checkUsername = async (userName: any) => {
  const response = await api.post(`user/check-username`, userName);
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
  formData.append('role', userData.role);
  formData.append('gender', userData?.gender?.toLowerCase());
  if (userData?.profileImage) {
    formData.append('profileImage', userData?.profileImage);
  }
  if (userData?.volunteer) {
    userData?.volunteer.forEach((volunteerData: any, index) => {
      formData.append(`volunteer[${index}][service]`, volunteerData.service);
      formData.append(
        `volunteer[${index}][subService]`,
        volunteerData.subService,
      );
    });
    if (userData?.gallery) {
      for (let i = 0; i < userData.gallery.length; i++) {
        formData.append('gallery', userData.gallery[i]);
      }
    }
  }

  const response = await api.put(`user/${userData?._id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
