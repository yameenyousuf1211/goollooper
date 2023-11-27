import * as Yup from 'yup';
import {IUserRole} from '../interfaces/user.interface';

const email = Yup.string()
  .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email')
  .required('Email is required');

const notRequiredEmail = Yup.string()
  .matches(
    /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
    'Invalid email',
  )
  .notRequired();

export const loginSchema = Yup.object().shape({
  email: email,
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: email,
});

export const createNewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Password must be same'),
});

export const createAccountSchema = Yup.object().shape({
  email: email,
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Password must be same'),
});

export const createProfileSchema = (userRole: IUserRole) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .matches(/^[A-Za-z]+$/, 'Invalid First Name') // Ensures no spaces in the name
      .min(3, 'First Name must be at least 3 characters long'),
    lastName: Yup.string()
      .required('Last Name is required')
      .matches(/^[A-Za-z -]+$/, 'Invalid Last Name') // Ensures no spaces in the name
      .min(3, 'Last Name must be at least 3 characters long'),
    userName: Yup.string()
      .required('Username is required')
      .matches(/^[A-Za-z0-9]+$/, 'Invalid input: No spaces allowed')
      .min(3, 'Username must be at least 3 characters')
      .max(10, 'Username must be at most 10 characters'),
    email: notRequiredEmail,
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    age: Yup.number()
      .required('Age is required')
      .min(15, 'Age must be greater than 14'),
    about: Yup.string().required('About is required'),
    volunteer: Yup.array().required('Volunteer is required'),
    services: Yup.array().test({
      name: 'services',
      exclusive: true,
      message: 'Service Speciality is required',
      test: value => {
        if (userRole === 'service_provider') {
          return value !== undefined && value !== '';
        }
        return true;
      },
    }),

    // company validations
    company: Yup.object({
      companyName: Yup.string()
        .matches(/^[A-Za-z]+$/, 'Invalid Company Name')
        .min(3, 'Company Name must be at least 3 characters long'),
      website: Yup.string().matches(
        /^(https?:\/\/)?(www\.)?(?!.*facebook\.com)(\S*)$/i,
        'Invalid Facebook URL format',
      ),
      affiliation: Yup.string()
        .matches(/^[A-Za-z]+$/, 'Invalid Affiliation') // Ensures no spaces in the name
        .min(3, 'Affiliation must be at least 3 characters long'),
      publication: Yup.string()
        .matches(/^[A-Za-z]+$/, 'Invalid Publication') // Ensures no spaces in the name
        .min(3, 'Publication must be at least 3 characters long'),
    }),

    // reference validations
    reference: Yup.object({
      referenceName: Yup.string()
        .matches(/^[A-Za-z]+$/, 'Invalid Reference') // Ensures no spaces in the name
        .min(3, 'Reference Name must be at least 3 characters long'),
      contact: Yup.string().matches(/^[A-Za-z0-9]+$/, 'Invalid Contact'), // Ensures no spaces in the name
    }),
  });
};
