import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import StarIcon from '../../../../assets/icons/StarIcon';
import {globalStlyes} from '../../../styles/GlobalStyles';
import InfoIcon from '../../../../assets/icons/InfoIcon';
import {primaryColor} from '../../../utils/colors';
import CustomModal from '../../modals/CustomBottomModal';
import {IPlan, ISubscription} from '../../../interfaces/user.interface';

interface Props {
  data: ISubscription | IPlan;
  isSelected: boolean;
  isShowIcon?: boolean;
  onSelectOption: (id: string, name?: string, plan?: IPlan[]) => void;
  onSelectInfo?: (heading: string, text: string) => void;
}

const SubscriptionCard = ({
  data,
  isSelected,
  isShowIcon = true,
  onSelectOption,
  onSelectInfo,
}: Props) => {
  const [infoModal, setInfoModal] = useState<boolean>(false);

  const handleInfoModal = (name: string, description: string) => {
    setInfoModal(true);
    if (onSelectInfo) {
      onSelectInfo(name, description);
    }
  };

  const handleSelectOption = (data: ISubscription | IPlan) => {
    if ('plans' in data) {
      onSelectOption(data._id, data?.name, data?.plans);
    } else {
      onSelectOption(data._id);
    }
  };

  const handleInfoPress = (data: ISubscription) => {
    if (isShowIcon && onSelectInfo) {
      onSelectInfo(data?.name, data?.description);
    }
  };

  const getDisplayName = (data: ISubscription | IPlan) => {
    if ('name' in data) {
      return data.name;
    } else {
      return `$${data.price}`;
    }
  };

  const getTagline = (data: ISubscription | IPlan) => {
    if ('tagline' in data) {
      return data.tagline;
    } else {
      return `Per ${
        data.duration.charAt(0).toUpperCase() + data.duration.slice(1)
      }`;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleSelectOption(data)}>
      {isSelected && (
        <View style={styles.selectedStyles}>
          <StarIcon fill="#ffffff" />
          <Text style={[globalStlyes.text12, {color: 'white'}]}>
            Boost my profile
          </Text>
        </View>
      )}
      <View
        style={[
          styles.serviceProvider,
          {
            borderTopRightRadius: isSelected ? 0 : 16,
            borderTopLeftRadius: isSelected ? 0 : 16,
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? primaryColor : undefined,
          },
        ]}>
        <View style={{gap: 10}}>
          <Text style={[globalStlyes.text16]}>{getDisplayName(data)}</Text>
          <Text style={[globalStlyes.text12]}>({getTagline(data)})</Text>
        </View>

        {isShowIcon ? (
          <TouchableOpacity
            onPress={() => handleInfoPress(data as ISubscription)}>
            <InfoIcon />
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  serviceProvider: {
    backgroundColor: '#F9F9F9',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: primaryColor,
    padding: 10,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});
