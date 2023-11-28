import React, {useEffect} from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import {Image} from 'react-native';
import UpperArrowIcon from '../../../../../assets/icons/UpperArrowIcon';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {IFileData, IUser} from '../../../../interfaces/user.interface';
import {setUserData} from '../../../../redux/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';

interface Props {
  label?: string;
  name?: string;
  profilePicture: IFileData | null;
  setProfilePicture: any;
}

const {width, height} = Dimensions.get('screen');

const UploadProfile = ({
  label,
  name,
  profilePicture,
  setProfilePicture,
}: Props) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      const cameraPermission =
        granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const storagePermission =
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (cameraPermission && storagePermission) {
        console.log('Camera permissions granted');
      } else {
        console.log('Camera permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUploadProfile = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
    };
    await launchImageLibrary(options, (response: any) => {
      if (response.assets) {
        setProfilePicture({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      }
      if (name === 'companyLogo') {
        const data: Partial<IUser> = {
          ...prevUserData,
          company: {
            resume: prevUserData?.company?.resume,
            logo: {
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
            },
          },
        };
        console.log('setting company logo');
        console.log(data, 'data');
        dispatch(setUserData(data as IUser));
      }
    });
  };
  return (
    <TouchableOpacity
      style={{gap: height * 0.038, width: 132}}
      onPress={handleUploadProfile}>
      <Text style={globalStlyes.text14}>{label ? label : 'Profile photo'}</Text>
      <View
        style={[
          styles.photoContainer,
          {borderWidth: profilePicture == null ? 2 : 0},
        ]}>
        {profilePicture !== null ? (
          <>
            <Image
              source={{uri: profilePicture?.uri}}
              style={{
                width: 142,
                height: 142,
                borderRadius: 100,
              }}
            />
            <View
              style={{
                position: 'absolute',
                zIndex: 99,
                width: '100%',
                backgroundColor: 'rgba(250, 250, 250, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 0,
                height: 35,
              }}>
              <Text style={[globalStlyes.text12, {color: 'white'}]}>Edit</Text>
            </View>
          </>
        ) : (
          <>
            <UpperArrowIcon />
            <Text
              style={[globalStlyes.text12, {color: 'rgba(22, 26, 29, 0.3)'}]}>
              Upload
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UploadProfile;

const styles = StyleSheet.create({
  photoContainer: {
    width: 142,
    position: 'relative',
    height: 142,
    borderRadius: 200,
    borderStyle: 'dashed',
    borderColor: 'rgba(182, 183, 184, 1)',
    backgroundColor: 'rgba(250, 250, 250, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    overflow: 'hidden',
  },
});
