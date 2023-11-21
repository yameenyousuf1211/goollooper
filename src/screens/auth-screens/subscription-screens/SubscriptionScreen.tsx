import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import SubscriptionTitle from '../../../components/auth-components/SubscriptionTitle';
import {SERVICE_PROVIDERS} from '../../../utils/data';
import SubscriptionCard from '../../../components/auth-components/SubscriptionCard';
import CustomModal from '../../../components/modals/CustomBottomModal';
import {useFocusEffect} from '@react-navigation/native';

const SubscriptionScreen = ({navigation, route}: any) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [infoHeading, setInfoHeading] = useState<string>('');
  const [infoText, setInfoText] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      setInfoModal(false);
    }, [route]),
  );
  const handleInfoModal = (heading: string, text: string) => {
    setInfoHeading(heading);
    setInfoText(text);
    setInfoModal(true);
  };

  const handleSelectServiceProvider = (id: string) => {
    setSelectedProvider(id);
    setTimeout(() => {
      if (id === 'IWSubscription') {
        return;
      }
      navigation.navigate(id);
    }, 400);
  };
  return infoModal ? (
    <CustomModal
      title={infoHeading}
      text={infoText}
      buttonText="CLOSE"
      route="SubscriptionScreen"
      setModal={setInfoModal}
    />
  ) : (
    <View style={globalStlyes.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <SubscriptionTitle />
          <View style={{width: 320, gap: 10}}>
            {SERVICE_PROVIDERS.map((provider: any) => {
              let isSelected = selectedProvider.includes(provider.id);
              return (
                <SubscriptionCard
                  key={provider.id}
                  data={provider}
                  isSelected={isSelected}
                  onSelectOption={handleSelectServiceProvider}
                  onSelectInfo={handleInfoModal}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    gap: 30,
    width: '100%',
  },
});
