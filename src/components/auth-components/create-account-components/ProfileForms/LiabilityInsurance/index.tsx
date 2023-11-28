import React, {useState} from 'react';
import UploadPhotoContainer from '../../UploadPhotoContainer';
import { IFileData } from '../../../../../interfaces/user.interface';

const LiabilityInsurance = () => {
  const [galleryPhotoOne, setGalleryPhotoOne] = useState<IFileData | null>(null);
  const [galleryPhotoTwo, setGalleryPhotoTwo] = useState<IFileData | null>(null);
  const [galleryPhotoThree, setGalleryPhotoThree] = useState<IFileData | null>(
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
      name='insurances'
    />
  );
};

export default LiabilityInsurance;
