import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
} from 'react-native';
import {globalStlyes} from '../../styles/GlobalStyles';
import SettingIcon from '../../../assets/icons/SettingIcon';
import NotificationIcon from '../../../assets/icons/NotificationIcon';
import SearchIconTwo from '../../../assets/icons/SearchIconTwo';
import {primaryColor} from '../../utils/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import UserDashboard from '../../components/dashboard-components/UserDashboard';
import ProviderDashboard from '../../components/dashboard-components/ProviderDashboard';

const DashboardScreen = ({navigation}: any) => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const headerRightButton = (
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <SearchIconTwo />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <NotificationIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <SettingIcon />
        </TouchableOpacity>
      </View>
    );
    const headerLeftButton = (
      <View style={styles.headerLeft}>
        <ImageBackground
          source={require('../../../assets/pictorial-logo.png')}
          style={{
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1369826066/photo/blue-female-cyber-with-neon-pink-meta-verse-loading-text-goggles-on-geometric-dark-background.jpg?s=2048x2048&w=is&k=20&c=cMhjFAEbuGsA4ftjO31kO01p5e_1eXeko25GFL1W4Z8=',
            }}
            width={25}
            height={25}
            style={{borderRadius: 100}}
          />
        </ImageBackground>
      </View>
    );

    navigation.setOptions({
      headerRight: () => headerRightButton,
      headerLeft: () => headerLeftButton,
    });
  }, [navigation]);
  return (
    <View
      style={[
        globalStlyes.container,
        {
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        },
      ]}>
      {/* <Text style={globalStlyes.text14}>Dashboard Coming soon!</Text> */}
      <ScrollView>
        <View style={{gap: 20}}>
          <Text
            style={[
              globalStlyes.text14,
              {color: primaryColor, paddingTop: 20, paddingLeft: 20},
            ]}>
            My Activities
          </Text>
          {/* // FOR NORMAL USERS */}
          <UserDashboard />
          {/* // FOR subscribed USERS */}
          {/* <ProviderDashboard /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 24,
  },
  headerLeft: {
    paddingLeft: 18,
  },
  container: {
    flexDirection: 'row',
    gap: 4,
  },
});
