import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FileData} from '../../../../screens/auth-screens/create-account-screens/CreateProfileScreen';
import CancelIcon from '../../../../../assets/icons/CancelIcon';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
interface Props {
  image: FileData | null;
  setImage: any;
}

const UploadPhoto = ({image, setImage}: Props) => {
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
      }
    });
  };

  const handleDeleteImage = () => {
    setImage(null);
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
