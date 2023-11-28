import React from 'react';
import {View} from 'react-native';
import UploadPhoto from './UploadPhoto';
import { IFileData } from '../../../../interfaces/user.interface';

interface Props {
  galleryPhotoOne: IFileData | null;
  galleryPhotoTwo: IFileData | null;
  galleryPhotoThree: IFileData | null;
  setGalleryPhotoOne: any;
  setGalleryPhotoTwo: any;
  setGalleryPhotoThree: any;
  name: string;
}

const UploadPhotoContainer = ({
  galleryPhotoOne,
  galleryPhotoTwo,
  galleryPhotoThree,
  setGalleryPhotoOne,
  setGalleryPhotoTwo,
  setGalleryPhotoThree,
  name
}: Props) => {
  return (
    <View style={{flexDirection: 'row', gap: 5}}>
      <UploadPhoto image={galleryPhotoOne} setImage={setGalleryPhotoOne} name={name} />
      <UploadPhoto image={galleryPhotoTwo} setImage={setGalleryPhotoTwo} name={name} />
      <UploadPhoto image={galleryPhotoThree} setImage={setGalleryPhotoThree} name={name} />
    </View>
  );
};

export default UploadPhotoContainer;
