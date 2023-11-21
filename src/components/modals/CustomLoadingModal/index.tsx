import {BlurView} from '@react-native-community/blur';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState, useEffect, useCallback} from 'react';
import {globalStlyes} from '../../../styles/GlobalStyles';
import LoaderIcon from '../../../../assets/icons/LoaderIcon';

interface Props {
  route: string;
}

const CustomLoadingModal = ({route}: Props) => {
  const navigation = useNavigation<any>();
  const [isModal, setIsModal] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      setIsModal(true);
    }, []),
  ),
    [];
  return (
    <View style={styles.absolute}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <TouchableOpacity onPress={() => navigation.navigate(route)}>
                    <Icon name="arrow-back" size={24} color="#161A1D" />
                  </TouchableOpacity>
                  <Text style={globalStlyes.text14}>Payment</Text>
                  <View />
                </View>
                <View style={{gap: 10}}>
                  <ActivityIndicator />
                  <Text>Processing</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomLoadingModal;

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
    paddingHorizontal: 20,
    gap: 40,
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
