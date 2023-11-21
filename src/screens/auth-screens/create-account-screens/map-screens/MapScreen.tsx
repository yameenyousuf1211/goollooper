import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import SearchIcon from '../../../../../assets/icons/SearchIcon';
import NavigationIcon from '../../../../../assets/icons/NavigationIcon';
import MarkerPinIcon from '../../../../../assets/icons/MarkerPinIcon';
import MapView from 'react-native-maps';
import {primaryColor} from '../../../../utils/colors';

const MapScreen = ({navigation}: any) => {
  const [isSelected, setIsSelected] = useState<string>('');

  useEffect(() => {
    const headerRightButton = (
      <TouchableOpacity onPress={() => navigation.navigate('CreateProfileScreen')}>
        <View style={{marginRight: 16}}>
          <Text style={[globalStlyes.text14, {color: primaryColor}]}>Done</Text>
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
        {justifyContent: 'flex-start', paddingTop: 20},
      ]}>
      <View style={{flex: 1, width: '100%', gap: 10}}>
        <View style={styles.searchContainer}>
          <SearchIcon />
          <TextInput placeholder="Search" />
        </View>
        <TouchableOpacity style={styles.locationContainer}>
          <View style={styles.iconContainer}>
            <NavigationIcon />
          </View>
          <View style={{gap: 2}}>
            <Text
              style={[globalStlyes.text12, {color: 'rgba(123, 141, 149, 1)'}]}>
              New Location
            </Text>
            <Text
              style={[globalStlyes.text12, {color: 'rgba(123, 141, 149, 1)'}]}>
              Loading...
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.locationContainer}>
          <View style={styles.iconContainer}>
            <MarkerPinIcon />
          </View>
          <View style={{gap: 2}}>
            <Text
              style={[globalStlyes.text12, {color: 'rgba(123, 141, 149, 1)'}]}>
              Valley Hayes
            </Text>
            <Text
              style={[globalStlyes.text12, {color: 'rgba(123, 141, 149, 1)'}]}>
              Valley Hayes, San Francisco, USA
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <MapView
            style={{
              flex: 1,
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    padding: 1,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 40,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(237, 237, 237, 1)',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  iconContainer: {
    width: 47,
    height: 47,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 1)',
  },
});
