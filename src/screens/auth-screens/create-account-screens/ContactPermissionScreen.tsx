import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Dimensions, ImageBackground} from 'react-native';
import Contacts from 'react-native-contacts';
import CustomModal from '../../../components/modals/CustomBottomModal';

const {width, height} = Dimensions.get('screen');

const ContactPermissionScreen = ({navigation}: any) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    // Check and request contacts permission
    const checkContactsPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Permission',
            message: 'Sync Goollooper contacts with your phone contacts',
            buttonPositive: 'Allow',
          },
        );
        setIsModal(true);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission granted, proceed to the next screen
          Contacts.getAll()
            .then(contacts => {
              // Work with contacts
              //   console.log(contacts);
              console.log('Permission: ', granted);
              setIsModal(true);
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          console.log('Permission denied, proceeding to the next screen');
          // navigation.navigate('Splash');
          setIsModal(true);
        }
      } catch (error) {
        console.error('Permission error: ', error);
      }
    };

    checkContactsPermission();
  }, [navigation]);

  return isModal ? (
    <CustomModal
      title="Account Created"
      text="Congratulations! Your account has been created successfully.Please proceed to profile creation."
      buttonText="Set Up Profile"
      route="CreateProfileScreen"
    />
  ) : (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/blurBg.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    />
  );
};

export default ContactPermissionScreen;
