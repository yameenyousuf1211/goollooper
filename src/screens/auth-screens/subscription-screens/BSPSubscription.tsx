import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import SubscriptionTitle from '../../../components/auth-components/SubscriptionTitle';
import SubscriptionCard from '../../../components/auth-components/SubscriptionCard';
import {BSL_SUBS, BSP_SUBS} from '../../../utils/data';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import {verticalScale} from '../../../utils/metrics';
import CustomLoadingModal from '../../../components/modals/CustomLoadingModal';
import CustomModal from '../../../components/modals/CustomBottomModal';
import {useDispatch} from 'react-redux';
import { setBoostType } from '../../../redux/AuthSlice';

const BSPSubscription = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isPaymentProcessing, setIsPaymentProcessing] =
    useState<boolean>(false);
  const [isPaymentSuccessfull, setIsPaymentSuccessfull] =
    useState<boolean>(false);

  const handleSelectOption = (id: string) => {
    setSelectedOption(id);
  };
  const hanldeBoost = () => {
    setIsPaymentProcessing(true);
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setIsPaymentSuccessfull(true);
    }, 3000);
    dispatch(setBoostType('BSP'))
  };

  return (
    <View style={globalStlyes.container}>
      {isPaymentProcessing ? (
        <CustomLoadingModal route="BSPSubscription" />
      ) : isPaymentSuccessfull ? (
        <CustomModal
          title="Payment Successful"
          text="Congratulations! Your payment of $9.99 to boost your profile for a day"
          buttonText="Close"
          route="CreateProfileScreen"
          setModal={setIsPaymentSuccessfull}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <SubscriptionTitle subTitle="BSP" />
            <View style={{width: 320, gap: 10}}>
              {BSP_SUBS.map((data: any) => {
                let isSelected = selectedOption.includes(data.id);
                return (
                  <SubscriptionCard
                    key={data.id}
                    data={data}
                    isSelected={isSelected}
                    isShowIcon={false}
                    onSelectOption={() => handleSelectOption(data.id)}
                  />
                );
              })}
            </View>
            <View
              style={{
                marginTop:
                  selectedOption === ''
                    ? verticalScale(140)
                    : verticalScale(100),
              }}>
              <CustomButton
                isDisabled={selectedOption === ''}
                onPress={hanldeBoost}>
                BOOST
              </CustomButton>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default BSPSubscription;
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    gap: 30,
    width: '100%',
  },
});
