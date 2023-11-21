import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StarIcon from '../../../../assets/icons/StarIcon';
import {globalStlyes} from '../../../styles/GlobalStyles';

interface Props {
  title?: string;
  subTitle?: string;
}

const SubscriptionTitle = ({title, subTitle}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <StarIcon />
      </View>
      <Text style={globalStlyes.text16}>{title ? title : 'Subscriptions'}</Text>
      <Text style={[globalStlyes.text14, {fontFamily: 'SpaceGrotesk-Medium'}]}>
        {subTitle ? subTitle : 'Select Service Category'}
      </Text>
    </View>
  );
};

export default SubscriptionTitle;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF3CE',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
