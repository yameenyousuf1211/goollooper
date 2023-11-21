import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import {moderateScale} from '../../../../utils/metrics';
import {primaryColor, secondaryTextColor} from '../../../../utils/colors';
import {REPEAT_SCHEDULE, SCHEDULE_TIME} from '../../../../utils/data';
import CheckIconTwo from '../../../../../assets/icons/CheckIconTwo';
import CustomButton from '../../../../components/reuseable-components/CustomButton';

const SetScheduleScreen = ({navigation}: any) => {
  const [selected, setSelected] = useState<string>('');

  const [selectedTime, setSelectedTime] = useState<string[]>([]);

  const [repetition, setRepeition] = useState<string[]>([]);

  useEffect(() => {
    const headerRightButton = (
      <TouchableOpacity onPress={() => navigation.navigate('ScheduleScreen')}>
        <View style={{marginRight: 16}}>
          <Text style={[globalStlyes.text14, {color: primaryColor}]}>Save</Text>
        </View>
      </TouchableOpacity>
    );

    navigation.setOptions({
      headerRight: () => headerRightButton,
    });
  }, [navigation]);

  const handleSelectTime = (id: string) => {
    if (selectedTime?.includes(id)) {
      const filteredItems = selectedTime?.filter(
        (deleteItem: any) => deleteItem !== id,
      );
      setSelectedTime(filteredItems);
    } else {
      setSelectedTime(prevItems => [...prevItems, id]);
    }
  };

  const handleSelectRepetition = (id: string) => {
    if (repetition?.includes(id)) {
      const filteredItems = repetition?.filter(
        (deleteItem: any) => deleteItem !== id,
      );
      setRepeition(filteredItems);
    } else {
      setRepeition(prevItems => [...prevItems, id]);
    }
  };

  return (
    <View
      style={[
        globalStlyes.container,
        {justifyContent: 'flex-start', width: '100%', gap: 10},
      ]}>
      <View style={{width: '100%'}}>
        <Calendar
          style={styles.calendar}
          theme={{
            textSectionTitleColor: '#b6c1cd',
            todayTextColor: '#fff',
            todayBackgroundColor: primaryColor,
            dayTextColor: '#2d4150',
            textDisabledColor: primaryColor,
            arrowColor: primaryColor,
            monthTextColor: 'rgba(0, 0, 0, 1)',
          }}
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: primaryColor,
              disableTouchEvent: true,
            },
          }}
        />
      </View>
      <ScrollView style={{width: '100%'}}>
        <View
          style={[
            styles.scheduleTimeContainer,
            {
              borderRadius: 32,
              elevation: 1,
              borderWidth: 1,
              borderColor: 'rgba(237, 237, 237, 1)',
            },
          ]}>
          <View>
            <Text style={globalStlyes.text16}>Wed, 4 Nov.</Text>
          </View>
          <View style={styles.timeContainer}>
            {SCHEDULE_TIME.map((item: any) => {
              const isSelected = selectedTime.includes(item.id);
              return (
                <View key={item.id} style={styles.timeInnerContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SettimeScreen')}>
                    <Text style={globalStlyes.text14}>{item.time}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSelectTime(item.id)}
                    style={[
                      styles.iconContainer,
                      {
                        borderWidth: isSelected ? 0 : 2,
                        borderColor: primaryColor,
                        backgroundColor: isSelected
                          ? primaryColor
                          : 'transparent',
                      },
                    ]}>
                    <CheckIconTwo />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <View
          style={[styles.timeContainer, {marginVertical: 20, marginTop: 30}]}>
          {REPEAT_SCHEDULE.map((item: any) => {
            const isSelected = repetition.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.timeInnerContainer,
                  {
                    justifyContent: 'flex-start',
                    gap: 10,
                    paddingHorizontal: 30,
                  },
                ]}
                onPress={() => handleSelectRepetition(item.id)}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      borderWidth: isSelected ? 0 : 1,
                      borderColor: primaryColor,
                      backgroundColor: isSelected
                        ? primaryColor
                        : 'transparent',
                    },
                  ]}>
                  <CheckIconTwo />
                </View>
                <View>
                  <Text style={globalStlyes.text14}>{item.type}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{margin: 20}}>
          <CustomButton onPress={() => navigation.navigate('ScheduleScreen')}>
            Schedule
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default SetScheduleScreen;

const styles = StyleSheet.create({
  calendar: {
    margin: 20,
    borderRadius: moderateScale(13),
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(237, 237, 237, 1)',
    color: primaryColor,
  },
  scheduleTimeContainer: {
    padding: 16,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 16,
  },
  timeContainer: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 8,
  },
  timeInnerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
