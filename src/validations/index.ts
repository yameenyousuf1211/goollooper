import * as Yup from 'yup';

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

export const createProfileSchema = Yup.object().shape({
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
    .required('Age is required!')
    .min(15, 'Age must be greater than 14'),
  about: Yup.string().required('About is required'),
  volunteer: Yup.array().required('Volunteer is required'),

  // serviceProviderSpeciality: Yup.array().notRequired(),
  // company validations
  companyName: Yup.string()
    .notRequired()
    .matches(/^[A-Za-z]+$/, 'Invalid Last Name') // Ensures no spaces in the name
    .min(3, 'Last Name must be at least 3 characters long'),
  website: Yup.string()
    .notRequired()
    .matches(/^[A-Za-z]+$/, 'Invalid Last Name') // Ensures no spaces in the name
    .min(3, 'Website must be at least 3 characters long'),
  affiliation: Yup.string()
    .notRequired()
    .matches(/^[A-Za-z]+$/, 'Invalid Last Name') // Ensures no spaces in the name
    .min(3, 'Affiliation must be at least 3 characters long'),
  publication: Yup.string()
    .notRequired()
    .matches(/^[A-Za-z]+$/, 'Invalid Last Name') // Ensures no spaces in the name
    .min(3, 'Publication must be at least 3 characters long'),

  // reference validations
  referenceName: Yup.string()
    .notRequired()
    .matches(/^[A-Za-z]+$/, 'Invalid Last Name') // Ensures no spaces in the name
    .min(3, 'Reference Name must be at least 3 characters long'),
  contact: Yup.string()
    .notRequired()
    .matches(/^[A-Za-z]+$/, 'Invalid Last Name') // Ensures no spaces in the name
    .min(3, 'Contact Name must be at least 3 characters long'),
});
