export type IUserRole = 'serviceProvider' | 'user' | null;

export interface IUser {
  _id: string;
  email: string;
  phone: string;
  countryCode: string;
  phoneCode: string;
  fcmToken: string;
  role: IUserRole;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  country: string;
  city: string;
  physicalInformation: string;
  gender: string;
  age: string;
  dob: Date | string;
  hourlyRate: string | null;
}
