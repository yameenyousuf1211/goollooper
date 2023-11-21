import React, {useState} from 'react';
import {FileData} from '../../../../../screens/auth-screens/create-account-screens/CreateProfileScreen';
import UploadPhotoContainer from '../../UploadPhotoContainer';

const LiabilityInsurance = () => {
  const [galleryPhotoOne, setGalleryPhotoOne] = useState<FileData | null>(null);
  const [galleryPhotoTwo, setGalleryPhotoTwo] = useState<FileData | null>(null);
  const [galleryPhotoThree, setGalleryPhotoThree] = useState<FileData | null>(
    null,
  );
  return (
    <UploadPhotoContainer
      galleryPhotoOne={galleryPhotoOne}
      galleryPhotoTwo={galleryPhotoTwo}
      galleryPhotoThree={galleryPhotoThree}
      setGalleryPhotoOne={setGalleryPhotoOne}
      setGalleryPhotoTwo={setGalleryPhotoTwo}
      setGalleryPhotoThree={setGalleryPhotoThree}
    />
  );
};

export default LiabilityInsurance;
