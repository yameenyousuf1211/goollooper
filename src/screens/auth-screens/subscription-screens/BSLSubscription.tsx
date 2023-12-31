import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import SubscriptionTitle from '../../../components/auth-components/SubscriptionTitle';
import SubscriptionCard from '../../../components/auth-components/SubscriptionCard';
import {BSL_SUBS} from '../../../utils/data';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import {verticalScale} from '../../../utils/metrics';
import {setBoostType} from '../../../redux/AuthSlice';
import {useDispatch} from 'react-redux';
import CustomLoadingModal from '../../../components/modals/CustomLoadingModal';
import CustomModal from '../../../components/modals/CustomBottomModal';
import {IPlan} from '../../../interfaces/user.interface';

const BSLSubscription = ({route}: any) => {
  const dispatch = useDispatch();
  const plans = route?.params?.plans;
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
    dispatch(setBoostType('BSL'));
  };

  return (
    <View style={globalStlyes.container}>
      {isPaymentProcessing ? (
        <CustomLoadingModal route="BSLSubscription" />
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
            <SubscriptionTitle subTitle="BSL" />
            <View style={{width: 320, gap: 10}}>
              {plans?.map((plan: IPlan) => {
                let isSelected = selectedOption.includes(plan._id);
                return (
                  <SubscriptionCard
                    key={plan._id}
                    data={plan}
                    isSelected={isSelected}
                    isShowIcon={false}
                    onSelectOption={() => handleSelectOption(plan._id)}
                  />
                );
              })}
            </View>
            <View
              style={{
                marginTop:
                  selectedOption === ''
                    ? verticalScale(340)
                    : verticalScale(300),
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

export default BSLSubscription;
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    gap: 30,
    width: '100%',
  },
});
