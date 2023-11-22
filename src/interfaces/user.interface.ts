export type IUserRole = 'service_provider' | 'user' | null;

export type ILocation = {
  type: 'Point';
  coordinates: [];
};

export type IFileData = {
  uri: string;
  name: string;
  type: string;
};

export type ICompany = {
  name: string | null;
  logo: IFileData | null;
  website: string | null;
  affiliation: string | null;
  publication: null;
  resume: string | null;
};
export type IReference = {
  name: string | null;
  contact: string | null;
};

export type IServiceData = {
  service: string;
  subService: string;
};

export interface IUser {
  location?: ILocation;
  company?: ICompany;
  reference?: IReference;
  userName: string | null;
  gallery?: IFileData[];
  about: string | null;
  locationType?: 'local';
  state?: string | null;
  city?: string | null;
  country?: string | null;
  visuals?: IFileData[];
  certificates?: IFileData[];
  licenses?: IFileData[];
  insurances?: IFileData[];
  isProfileCompleted?: boolean;
  _id?: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  dob?: string | Date | null;
  gender: string | null;
  age: string | number | null;
  phone: string | number | null;
  role?: IUserRole;
  fcmToken?: string | null;
  volunteer?: [];
  services?: [];
  zipCode?: [];
}

export interface IUserFormErrors {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  about: string;
  volunteer: string; 
}

/// services and pagination

export type ISubService = {
  title: string;
  _id: string;
};

export type IService = {
  _id: string;
  title: string;
  type: 'volunteer' | 'interest';
  subServices: ISubService[];
};

// export interface IPagination = {

// }
