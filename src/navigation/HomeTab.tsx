import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/dashboard-screens';
import NoteScreen from '../screens/note-screens';
import CalendarScreen from '../screens/calendar-screens';
import MessagesScreen from '../screens/messages-screens';
import HomeIcon from '../../assets/icons/HomeIcon';
import NoteIcon from '../../assets/icons/NoteIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import MessageIcon from '../../assets/icons/MessageIcon';
import {primaryColor} from '../utils/colors';
import FillHomeIcon from '../../assets/icons/FillHomeIcon';
import FillNoteIcon from '../../assets/icons/FillNoteIcon';
import FillCalendarIcon from '../../assets/icons/FillCalendarIcon';
import FillMessagesIcon from '../../assets/icons/FillMessagesIcon';
import CreateListScreen from '../screens/create-list-screens';
import {View, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

export const HomeTab = () => {
  
  const CustomIcon = ({focused, name}: {focused: boolean; name: string}) => {
    if (name === 'dashboard') {
      return focused ? <FillHomeIcon /> : <HomeIcon />;
    } else if (name === 'note') {
      return focused ? <FillNoteIcon /> : <NoteIcon />;
    } else if (name === 'add') {
      return (
        <View style={styles.icon}>
          <Icon name="add-outline" size={20} color={'#ffffff'} />
        </View>
      );
    } else if (name === 'calendar') {
      return focused ? <FillCalendarIcon /> : <CalendarIcon />;
    } else if (name === 'messages') {
      return focused ? <FillMessagesIcon /> : <MessageIcon />;
    } else {
      return null;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 75},
        headerTintColor: '#161A1D',
        headerTitleAlign: 'center',
        headerStyle: {
          height: 50,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'SpaceGrotesk-Medium',
        },
      }}>
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="dashboard" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="NoteScreen"
        component={NoteScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="note" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateListScreen"
        component={CreateListScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="add" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="calendar" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="messages" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
    borderRadius: 100,
  },
});
