import {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import ChevronRightIcon from '../../../../../assets/icons/ChevronRightIcon';
import {primaryColor} from '../../../../utils/colors';

const ScheduleScreen = ({navigation}: any) => {
  const array = [1, 3, 44, , 442, 322, 22, 22];

  useEffect(() => {
    const headerRightButton = (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProfileScreen')}>
        <View style={{marginRight: 16}}>
          <Text style={[globalStlyes.text14, {color: primaryColor}]}>Save</Text>
        </View>
      </TouchableOpacity>
    );

    navigation.setOptions({
      headerRight: () => headerRightButton,
    });
  }, [navigation]);

  return (
    <View
      style={[
        globalStlyes.container,
        {justifyContent: 'flex-start', padding: 20, width: '100%', gap: 10},
      ]}>
      <TouchableOpacity
        style={styles.currentMonthContainer}
        onPress={() => navigation.navigate('SetScheduleScreen')}>
        <Text style={[globalStlyes.text14, {color: 'rgba(0, 0, 0, 1)'}]}>
          November
        </Text>
        <ChevronRightIcon />
      </TouchableOpacity>
      <View style={styles.cardOuterContainer}>
        {array.map(item => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={item}
            style={styles.cardContainer}
            onPress={() => navigation.navigate('SetScheduleScreen')}>
            <Text style={[globalStlyes.text12, {color: '#ffffff'}]}>WED</Text>
            <Text
              style={[
                globalStlyes.text16,
                {
                  color: '#ffffff',
                  fontFamily: 'SpaceGrotesk-Regular',
                  fontWeight: '400',
                },
              ]}>
              4 Nov.
            </Text>
            <Text style={[globalStlyes.text12, {color: '#ffffff'}]}>
              0 slots
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  currentMonthContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12,
  },
  cardOuterContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  cardContainer: {
    width: 102,
    height: 88,
    backgroundColor: primaryColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
});
