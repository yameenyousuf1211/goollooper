import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {primaryColor, secondaryTextColor} from '../../../utils/colors';
import CustomButton from '../../reuseable-components/CustomButton';
import ChevronRightIconTwo from '../../../../assets/icons/ChevronRightIconTwo';

interface Props {
  onBoostProfile: () => void;
}

const BoostProfile = ({onBoostProfile}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={globalStlyes.text14}>Unlock Other Profiles Criteria</Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'SpaceGrotesk-Regular',
          textAlign: 'center',
          color: secondaryTextColor,
        }}>
        {' '}
        This can help boost your profile and be viewed by Goolloopers easily.
      </Text>
      <CustomButton extraStyles={{width: 180}} onPress={onBoostProfile}>
        <View style={styles.buttonInnerContainer}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'SpaceGrotesk-Regular',
              textAlign: 'center',
              color: 'white',
            }}>
            {' '}
            Boost my profile
          </Text>
          <View>
            <ChevronRightIconTwo />
          </View>
        </View>
      </CustomButton>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'SpaceGrotesk-Regular',
            textAlign: 'center',
            color: primaryColor,
          }}>
          Maybe later
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BoostProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    gap: 16,
    alignItems: 'center',
    padding: 20,
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
