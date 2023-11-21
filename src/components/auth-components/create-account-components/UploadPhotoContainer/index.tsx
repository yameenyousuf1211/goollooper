import React from 'react';
import {View} from 'react-native';
import UploadPhoto from './UploadPhoto';
import {FileData} from '../../../../screens/auth-screens/create-account-screens/CreateProfileScreen';

interface Props {
  galleryPhotoOne: FileData | null;
  galleryPhotoTwo: FileData | null;
  galleryPhotoThree: FileData | null;
  setGalleryPhotoOne: any;
  setGalleryPhotoTwo: any;
  setGalleryPhotoThree: any;
}

const UploadPhotoContainer = ({
  galleryPhotoOne,
  galleryPhotoTwo,
  galleryPhotoThree,
  setGalleryPhotoOne,
  setGalleryPhotoTwo,
  setGalleryPhotoThree,
}: Props) => {
  return (
    <View style={{flexDirection: 'row', gap: 5}}>
      <UploadPhoto image={galleryPhotoOne} setImage={setGalleryPhotoOne} />
      <UploadPhoto image={galleryPhotoTwo} setImage={setGalleryPhotoTwo} />
      <UploadPhoto image={galleryPhotoThree} setImage={setGalleryPhotoThree} />
    </View>
  );
};

export default UploadPhotoContainer;
