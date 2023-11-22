import React, {useCallback, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import SubscriptionTitle from '../../../components/auth-components/SubscriptionTitle';
import {SERVICE_PROVIDERS} from '../../../utils/data';
import SubscriptionCard from '../../../components/auth-components/SubscriptionCard';
import CustomModal from '../../../components/modals/CustomBottomModal';
import {useFocusEffect} from '@react-navigation/native';
import {IPlan, ISubscription} from '../../../interfaces/user.interface';
import {getSubscriptions} from '../../../api';

const SubscriptionScreen = ({navigation, route}: any) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [infoHeading, setInfoHeading] = useState<string>('');
  const [infoText, setInfoText] = useState<string>('');
  const [subscriptions, setSubscription] = useState<ISubscription[]>([]);

  useFocusEffect(
    useCallback(() => {
      setInfoModal(false);
    }, [route]),
  );

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getSubscriptions();
        const subscriptions = response?.data?.data;
        console.log(subscriptions, 'subss');
        setSubscription(subscriptions);
      } catch (error: any) {
        console.log(error?.response?.data, 'ERROR FROM SUBSCRIPTION SCREEN!');
      }
    };
    fetchSubscriptions();
  }, []);

  const handleInfoModal = (heading: string, text: string) => {
    setInfoHeading(heading);
    setInfoText(text);
    setInfoModal(true);
  };

  const handleSelectServiceProvider = (
    id: string,
    name: string,
    plan: IPlan[],
    ) => {
    console.log(plan,"PLAN")
    setSelectedProvider(id);
    setTimeout(() => {
      if (name == 'IW') {
        return;
      }
      navigation.navigate(name, {plans: plan});
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
            {subscriptions?.map((subscription: ISubscription) => {
              let isSelected = selectedProvider.includes(subscription._id);
              return (
                <SubscriptionCard
                  key={subscription._id}
                  data={subscription}
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
