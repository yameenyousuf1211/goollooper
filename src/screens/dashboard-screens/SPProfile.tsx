// import React, {useState} from 'react';
// import {
//   View,
//   ScrollView,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import {globalStlyes} from '../../styles/GlobalStyles';
// import StarIcon from '../../../assets/icons/StarIcon';
// import {primaryColor} from '../../utils/colors';
// import LocationIconTwo from '../../../assets/icons/LocationIconTwo';
// import {PROFILE_OPTIONS} from '../../utils/data';
// import ChevronBottomIcon from '../../../assets/icons/ChevronBottomIcon';
// import ChevronRightIcon from '../../../assets/icons/ChevronRightIcon';
// import ProfileOverview from '../../components/auth-components/create-account-components/ProfileForms/ProfileOverview';
// import VisualValidationForm from '../../components/auth-components/create-account-components/ProfileForms/VisualValidationForm';
// import BrandInfoForm from '../../components/auth-components/create-account-components/ProfileForms/BrandInfoForm';
// import ProfessionalCertificates from '../../components/auth-components/create-account-components/ProfileForms/ProfessionalCertificates';
// import Licensing from '../../components/auth-components/create-account-components/ProfileForms/Licensing';
// import Reference from '../../components/auth-components/create-account-components/ProfileForms/Reference';
// import LiabilityInsurance from '../../components/auth-components/create-account-components/ProfileForms/LiabilityInsurance';

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   phone: string;
//   about: string;
//   gender: string;
//   age: string;
//   volunteer: string;
//   serviceProviderSpeciality: string;
//   addSchedule: string;
//   // brand
//   registration: string;
//   websiteUrl: string;
//   affiliations: string;
//   publications: string;
//   resume: string;

//   // location
//   state: string;
//   city: string;
//   country: string;

//   //reference
//   name: string;
//   contactInfo: string;
// }

// const SPProfile = () => {
//   const [selectedProfileOptions, setSelectedProfileOptions] = useState<
//     string[]
//   >([]);
//   const initialValues: FormValues = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     username: '',
//     phone: '',
//     about: '',
//     gender: '',
//     age: '',
//     volunteer: '',
//     serviceProviderSpeciality: '',
//     addSchedule: '',
//     // company
//     registration: '',
//     websiteUrl: '',
//     affiliations: '',
//     publications: '',
//     resume: '',

//     // loc

//     state: '',
//     city: '',
//     country: '',
//     // reference
//     name: '',
//     contactInfo: '',
//   };
//   const handleSelectProfileOption = (id: string) => {
//     if (selectedProfileOptions.includes(id)) {
//       const filterOptions = selectedProfileOptions.filter(
//         (option: any) => option !== id,
//       );
//       console.log(filterOptions, 'filter');
//       setSelectedProfileOptions(filterOptions);
//     } else {
//       setSelectedProfileOptions((prev: any) => [...prev, id]);
//     }
//   };

//   return (
//     <View
//       style={[
//         globalStlyes.container,
//         {
//           alignItems: 'flex-start',
//           justifyContent: 'flex-start',
//           paddingLeft: 20,
//           paddingTop: 20,
//         },
//       ]}>
//       <ScrollView>
//         <View>
//           <View style={{flexDirection: 'row', gap: 8}}>
//             <Image
//               source={{
//                 uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
//               }}
//               width={100}
//               height={100}
//               style={styles.image}
//             />
//             <View>
//               <View>
//                 <Text style={globalStlyes.text16}>Charlie Bargson</Text>
//                 <Text style={globalStlyes.text12}>@charliebargson</Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: 6,
//                   marginTop: 12,
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: 3,
//                     backgroundColor: 'rgba(255, 243, 206, 1)',
//                     borderRadius: 12,
//                     padding: 10,
//                     paddingHorizontal: 16,
//                   }}>
//                   <StarIcon />
//                   <Text style={[globalStlyes.text14, {color: primaryColor}]}>
//                     {' '}
//                     4.9
//                   </Text>
//                 </View>
//                 <Text style={[globalStlyes.text14, {color: primaryColor}]}>
//                   BSL
//                 </Text>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     backgroundColor: primaryColor,
//                     borderRadius: 100,
//                     width: 34,
//                     height: 34,
//                   }}>
//                   <LocationIconTwo />
//                 </View>
//               </View>
//             </View>
//           </View>
//           {PROFILE_OPTIONS.map((profile: any) => {
//             const isSelected = selectedProfileOptions.includes(profile.id);
//             return (
//               <>
//                 <TouchableOpacity
//                   style={[
//                     styles.profileOptionsContainer,
//                     {
//                       backgroundColor: isSelected
//                         ? primaryColor
//                         : 'rgba(250, 250, 250, 1)',
//                     },
//                   ]}
//                   onPress={() => handleSelectProfileOption(profile.id)}>
//                   <Text
//                     style={[
//                       globalStlyes.text14,
//                       {
//                         color: isSelected ? 'white' : '#161A1D',
//                       },
//                     ]}>
//                     {profile.name}
//                   </Text>
//                   {isSelected ? <ChevronBottomIcon /> : <ChevronRightIcon />}
//                 </TouchableOpacity>
//                 {selectedProfileOptions.includes(profile.id) &&
//                   profile.name === 'Profile Overview' && (
//                     <ProfileOverview
//                       values={values}
//                       errors={errors}
//                       boostType={boostType}
//                       userRole={userRole}
//                       touched={touched}
//                       setFieldValue={setFieldValue}
//                       handleChange={handleChange}
//                     />
//                   )}
//                 {selectedProfileOptions.includes(profile.id) &&
//                   profile.name === 'Visual Validation' && (
//                     <VisualValidationForm />
//                   )}
//                 {selectedProfileOptions.includes(profile.id) &&
//                   profile.name === 'Brand Information' && (
//                     <BrandInfoForm
//                       values={values}
//                       errors={errors}
//                       touched={touched}
//                       setFieldValue={setFieldValue}
//                       handleChange={handleChange}
//                     />
//                   )}
//                 {selectedProfileOptions.includes(profile.id) &&
//                   profile.name === 'Professional Certifications' && (
//                     <ProfessionalCertificates />
//                   )}
//                 {selectedProfileOptions.includes(profile.id) &&
//                   profile.name === 'Licensing' && <Licensing />}
//                 {selectedProfileOptions.includes(profile.id) &&
//                   profile.name === 'Reference' && (
//                     <Reference
//                       values={values}
//                       errors={errors}
//                       touched={touched}
//                       setFieldValue={setFieldValue}
//                       handleChange={handleChange}
//                     />
//                   )}
//                 {selectedProfileOptions.includes(profile.id) &&
//                   profile.name ===
//                     'Liability Insurance / Certification of Insurance' && (
//                     <LiabilityInsurance />
//                   )}
//               </>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default SPProfile;

// const styles = StyleSheet.create({
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 200,
//   },
// });

import React from 'react';
import {Text} from 'react-native';

const SPProfile = () => {
  return <Text>SPProfile</Text>;
};

export default SPProfile;
