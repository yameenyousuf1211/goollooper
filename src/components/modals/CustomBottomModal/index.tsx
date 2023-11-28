import {BlurView} from '@react-native-community/blur';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckIcon from '../../../../assets/icons/CheckIcon';
import {globalStlyes} from '../../../styles/GlobalStyles';
import CustomButton from '../../reuseable-components/CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {CreateProfileScreenNavigationProp} from '../../../interfaces/navigation.interface';
import {useDispatch} from 'react-redux';
import {
  setAuthentication,
  setBoostType,
  setuserRole,
} from '../../../redux/AuthSlice';
import { primaryColor } from '../../../utils/colors';

interface Props {
  title: string;
  text: string;
  buttonText: string;
  route: string;
  isCompleteProfile?: boolean;
  setModal?: any;
}

const CustomModal = ({
  title,
  text,
  buttonText,
  route,
  isCompleteProfile,
  setModal,
}: Props) => {
  const navigation = useNavigation<CreateProfileScreenNavigationProp>();
  const [isModal, setIsModal] = useState<boolean>(true);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      setIsModal(true);
    }, []),
  ),
    [];
  return (
    <View style={styles.absolute}>
      {/* <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={8}
        reducedTransparencyFallbackColor="white"
      /> */}
      <Modal
        visible={isModal}
        transparent
        statusBarTranslucent
        animationType="fade">
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback
              onPress={() => console.log('Inner view pressed')}>
              <View style={styles.modalInnerContainer}>
                <View style={styles.iconContainer}>
                  {/* <CheckIcon /> */}
                  <Icon name="checkmark-outline" style={{fontWeight: '900'}} size={24} color={primaryColor}></Icon>
                </View>
                <View
                  style={{
                    paddingHorizontal: 58,
                    gap: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={globalStlyes.text16}>{title}</Text>
                  <Text style={[globalStlyes.text12, {textAlign: 'center'}]}>
                    {text}
                  </Text>
                </View>
                <View style={{width: '100%', paddingHorizontal: 20}}>
                  <CustomButton
                    onPress={() => {
                      if (isCompleteProfile) {
                        dispatch(setBoostType(null));
                        dispatch(setuserRole(null));
                        dispatch(setAuthentication(true));
                      }
                      navigation.navigate(route as any),
                        setIsModal(false),
                        setModal && setModal(false);
                    }}>
                    {buttonText}
                  </CustomButton>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  modalInnerContainer: {
    marginHorizontal: 12,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    justifyContent: 'center',
    paddingVertical: 40,
    alignItems: 'center',
    gap: 20,
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
