export type IUserRole = 'service_provider' | 'user' | null;

export type ILocation = {
  type: 'Point';
  coordinates: [number | undefined, number | undefined];
};

export type IFileData = {
  uri: string;
  name: string;
  type: string;
};

export type ICompany = {
  companyName?: string | null;
  logo?: IFileData | null;
  website?: string | null;
  affiliation?: string | null;
  publication?: string | null;
  resume?: IFileData | null;
};
export type IReference = {
  referenceName: string | null;
  contact: string | null;
};

export type IServiceData = {
  service: string;
  subService: string;
};

export type ILocationType = 'local' | 'global';

export type IZipCode = {code: string | null; isSelected: boolean};

export interface IUser {
  location?: ILocation;
  readableLocation?: string | null;
  company?: ICompany;
  reference?: IReference;
  userName: string | null;
  gallery?: IFileData[];
  about: string | null;
  locationType?: ILocationType | null;
  State?: string | null;
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
  profileImage?: IFileData | null;
  role?: IUserRole;
  fcmToken?: string | null;
  volunteer?: string | [];
  services?: string | [];
  zipCode?: IZipCode[];
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
  services: string;
  company?: {
    companyName: string;
    website: string;
    affiliation: string;
    publication: string;
  };
  reference?: {
    referenceName: string;
    contact: string;
  };
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

export type IPlan = {
  _id: string;
  price: number;
  duration: string;
};
export type ISubscription = {
  _id: string;
  name: string;
  tagline: string;
  description: string;
  plans: IPlan[];
};

// export interface IPagination = {

// }
