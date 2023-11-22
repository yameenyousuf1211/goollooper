import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {primaryColor} from '../../../utils/colors';
import {globalStlyes} from '../../../styles/GlobalStyles';

interface Props {
  interest: any;
}

const ServiceInterests = ({interest}: any) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={globalStlyes.text16}>Service Interest</Text>
        <TouchableOpacity>
          <Text
            style={[
              globalStlyes.text14,
              {color: primaryColor, marginRight: 14},
            ]}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.interestContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {interest.map((item: any) => (
            <View
              style={{
                backgroundColor: primaryColor,
                padding: 10,
                borderRadius: 12,
                marginRight: 3,
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                {item?.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ServiceInterests;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  interestContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingRight: 7,
  },
});
