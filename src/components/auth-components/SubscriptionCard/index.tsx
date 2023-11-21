import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import StarIcon from '../../../../assets/icons/StarIcon';
import {globalStlyes} from '../../../styles/GlobalStyles';
import InfoIcon from '../../../../assets/icons/InfoIcon';
import {primaryColor} from '../../../utils/colors';
import CustomModal from '../../modals/CustomBottomModal';

interface Props {
  data: any;
  isSelected: boolean;
  isShowIcon?: boolean;
  onSelectOption: (id: string) => void;
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
  const [infoHeading, setInfoHeading] = useState<string>('');
  const [infoText, setInfoText] = useState<string>('');
  const handleInfoModal = (id: string) => {
    setInfoModal(true);
    if (onSelectInfo) {
      if (id === 'BSPSubscription') {
        onSelectInfo(
          'BSP',
          'an independent business owner who provides commercial services to GS’s at their place of choice.',
        );
      } else if (id === 'MBSSubscription') {
        onSelectInfo(
          'MBS',
          'a business with personnel of 2 or more but no more than 10 workers.',
        );
      } else if (id === 'BSLSubscription') {
        onSelectInfo(
          'BSL',
          'a business that provides services at its place of business.',
        );
      } else {
        onSelectInfo(
          'IW',
          'an employee of a company or organization that will be tasked with providing services through that company or organization, strictly for that company or organization.',
        );
      }
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelectOption(data.id)}>
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
          <Text style={[globalStlyes.text16]}>{data.name}</Text>
          <Text style={globalStlyes.text12}>{data.description}</Text>
        </View>

        {isShowIcon ? (
          <TouchableOpacity onPress={() => handleInfoModal(data.id)}>
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
