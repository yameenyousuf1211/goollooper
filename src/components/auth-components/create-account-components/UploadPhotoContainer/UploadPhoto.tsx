import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FileData} from '../../../../screens/auth-screens/create-account-screens/CreateProfileScreen';
import CancelIcon from '../../../../../assets/icons/CancelIcon';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../../../redux/AuthSlice';
import {RootState} from '../../../../redux/store';
import {IUser} from '../../../../interfaces/user.interface';
interface Props {
  image: FileData | null;
  setImage: any;
  name: string;
}

const UploadPhoto = ({image, setImage, name}: Props) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const handleAddImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
    };
    await launchImageLibrary(options, (response: any) => {
      if (response.assets) {
        setImage({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
        if (name === 'gallery') {
          const data: Partial<IUser> = {
            ...prevUserData,
            gallery: [
              ...(prevUserData?.gallery ?? []),
              {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
              },
            ],
          };
          dispatch(setUserData(data as IUser));
        }
      }
    });
  };
  console.log(prevUserData);
  const handleDeleteImage = () => {
    setImage(null);
    if (name === 'gallery') {
      const data: Partial<IUser> = {
        ...prevUserData,
        gallery: prevUserData?.gallery
          ? prevUserData?.gallery.filter(deleteImg => deleteImg.uri !== image.uri)
          : [],
      };
      dispatch(setUserData(data as IUser));
    }
  };
  return (
    <>
      {image ? (
        <View style={{position: 'relative', flex: 1}}>
          <Image
            source={{uri: image?.uri}}
            style={{width: '100%', height: 110, borderRadius: 16}}
          />
          <TouchableOpacity
            onPress={handleDeleteImage}
            style={{
              width: 26,
              height: 26,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              backgroundColor: '#FF4343',
              right: 6,
              top: 6,
            }}>
            <CancelIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={handleAddImage}>
          <Icon name="add-outline" color="#B6B7B8" size={24} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  photoContainer: {
    width: '100%',
    flex: 1,
    height: 110,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(182, 183, 184, 1)',
    backgroundColor: 'rgba(250, 250, 250, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
});
