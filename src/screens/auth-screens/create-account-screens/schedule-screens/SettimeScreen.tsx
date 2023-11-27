import React, {useState, useEffect} from 'react';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {primaryColor} from '../../../../utils/colors';

const SettimeScreen = ({navigation}: any) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const headerRightButton = (
      <TouchableOpacity onPress={() => navigation.navigate('SetScheduleScreen')}>
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
        {justifyContent: 'center', width: '100%', gap: 30},
      ]}>
      <View style={styles.timeContainer}>
        <DatePicker
          mode="time"
          open={open}
          date={date}
          textColor="#000"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      {/* <View style={styles.timeContainer}>
        <Text style={[globalStlyes.text16, {textAlign: 'center'}]}>Ends</Text>
        <DatePicker
          mode="time"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View> */}
    </View>
  );
};

export default SettimeScreen;

const styles = StyleSheet.create({
  timeContainer: {
    gap: 20,
    justifyContent: 'center',
  },
});
