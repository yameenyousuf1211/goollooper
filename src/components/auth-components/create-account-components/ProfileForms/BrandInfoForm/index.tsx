import React, {useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import CustomInput from '../../../../reuseable-components/CustomInput';
import {globalStlyes} from '../../../../../styles/GlobalStyles';
import UploadProfile from '../../UploadProfile';
import {
  IFileData,
  IUser,
  IUserFormErrors,
} from '../../../../../interfaces/user.interface';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/store';
import {secondaryTextColor} from '../../../../../utils/colors';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  types,
} from 'react-native-document-picker';
import UploadIcon from '../../../../../../assets/icons/UploadIcon';
import {setUserData} from '../../../../../redux/AuthSlice';

interface Props {
  values: IUser;
  errors: IUserFormErrors;
  touched: any;
  setFieldValue: any;
  handleChange: any;
}
const {width, height} = Dimensions.get('screen');

const BrandInfoForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
}: Props) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const [logo, setLogo] = useState<IFileData | null>(null);
  const [resume, setResume] = useState<IFileData | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleUploadResume = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: types.pdf,
      });
      if (!isCancel(res)) {
        setResume(res);
        setFileName(res.name);
        const data: Partial<IUser> = {
          ...prevUserData,
          company: {
            logo: prevUserData?.company?.logo,
            resume: {
              uri: res?.uri as string,
              name: res?.name as string,
              type: res?.type as string,
            },
          },
        };
        dispatch(setUserData(data as IUser));
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(resume, 'RESUME');

  return (
    <View
      style={{
        gap: 10,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: '#ECECEC',
        padding: 10,
      }}>
      <CustomInput
        label="Company Registration"
        value={values.company?.companyName}
        error={errors.company?.companyName}
        touched={touched.company?.company}
        initialTouched={true}
        handleChange={handleChange('company.companyName')}
      />
      <View style={{marginBottom: 20}}>
        <UploadProfile
          label="Company Logo"
          name="companyLogo"
          profilePicture={logo}
          setProfilePicture={setLogo}
        />
      </View>
      <CustomInput
        label="Website"
        placeholder="Url here"
        value={values.company?.website}
        error={errors.company?.website}
        touched={touched?.website}
        initialTouched={true}
        handleChange={handleChange('company.website')}
      />
      <CustomInput
        label="Affiliations"
        value={values.company?.affiliation}
        error={errors.company?.affiliation}
        touched={touched?.affiliation}
        initialTouched={true}
        handleChange={handleChange('company.affiliation')}
      />
      <CustomInput
        label="Publications"
        value={values.company?.publication}
        error={errors.company?.publication}
        touched={touched?.publication}
        initialTouched={true}
        handleChange={handleChange('company.publication')}
      />
      <TouchableOpacity onPress={handleUploadResume}>
        <Text
          style={{
            color: secondaryTextColor,
            fontFamily: 'SpaceGrotesk-Medium',
            fontSize: width * 0.038,
          }}>
          Resume
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 300,
            position: 'relative',
          }}>
          {resume ? (
            <Text
              style={{
                color: secondaryTextColor,
                fontFamily: 'SpaceGrotesk-Medium',
                fontSize: width * 0.038,
                marginTop: 5,
              }}>
              {fileName}
            </Text>
          ) : (
            <>
              <Text
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#EDEDED',
                  paddingVertical: 10,
                  paddingLeft: 0,
                  color: 'rgba(22, 26, 29, 0.3)',
                  fontWeight: '400',
                  fontFamily: 'SpaceGrotesk-Medium',
                  fontSize: 14,
                  paddingRight: 30,
                  borderRadius: 12,
                  width: 300,
                }}>
                Type here
              </Text>
              <View
                style={{position: 'absolute', right: 5, alignItems: 'center'}}>
                <UploadIcon />
                <Text
                  style={[
                    globalStlyes.text12,
                    {color: 'rgba(22, 26, 29, 0.3)'},
                  ]}>
                  Upload
                </Text>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BrandInfoForm;
