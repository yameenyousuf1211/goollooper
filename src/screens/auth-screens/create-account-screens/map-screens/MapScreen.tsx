import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {useEffect, useState} from 'react';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import SearchIcon from '../../../../../assets/icons/SearchIcon';
import NavigationIcon from '../../../../../assets/icons/NavigationIcon';
import MarkerPinIcon from '../../../../../assets/icons/MarkerPinIcon';
import MapView, {Marker, Region} from 'react-native-maps';
import {primaryColor} from '../../../../utils/colors';
import Geolocation from 'react-native-geolocation-service';
import axios, {Axios} from 'axios';
import CheckIcon from '../../../../../assets/icons/CheckIcon';
import {IUser} from '../../../../interfaces/user.interface';
import {setUserData} from '../../../../redux/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';

const MapScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(
    undefined,
  );
  const [userCurrentLocation, setUserCurrentLocation] = useState<
    Region | undefined
  >(undefined);
  const [markerCoordinate, setMarkerCoordinate] = useState<Region | undefined>(
    undefined,
  );
  const [userAddress, setUserAddress] = useState<string>('Loading...');
  const [isSelectLocation, setIsSelectLocation] = useState<boolean>(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const location: Region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            };
            setInitialRegion(location);
            setUserCurrentLocation(location);
            setMarkerCoordinate(location);
          },
          (error: any) => {
            console.warn(error.message);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (userCurrentLocation) {
      const {latitude, longitude} = userCurrentLocation;
      const apiKey = 'AIzaSyAoQH4pdrX59zY5xcJrAUEgEqF5r4qRHes';
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      axios
        .get(apiUrl)
        .then(response => {
          if (response.data.results && response.data.results.length > 0) {
            const formattedAddress = response.data.results[0].formatted_address;
            setUserAddress(formattedAddress);
          }
        })
        .catch(error => {
          console.error('Error fetching location details:', error);
        });
    }
  }, [userCurrentLocation]);
  useEffect(() => {
    const headerRightButton = (
      <TouchableOpacity
        disabled={!isSelectLocation}
        onPress={handleSelectLocation}>
        <View style={{marginRight: 16}}>
          <Text
            style={[
              globalStlyes.text14,
              {
                color: isSelectLocation
                  ? primaryColor
                  : 'rgba(118, 118, 128, 0.6)',
              },
            ]}>
            Done
          </Text>
        </View>
      </TouchableOpacity>
    );

    navigation.setOptions({
      headerRight: () => headerRightButton,
    });
  }, [navigation, isSelectLocation]);

  const handleSelectLocation = () => {
    const data: Partial<IUser> = {
      ...prevUserData,
      location: {
        type: 'Point',
        coordinates: [
          userCurrentLocation?.latitude,
          userCurrentLocation?.longitude,
        ],
      },
      readableLocation: userAddress,
    };
    dispatch(setUserData(data as IUser));
    navigation.navigate('CreateProfileScreen');
  };
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
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => setIsSelectLocation(!isSelectLocation)}>
          <View style={styles.iconContainer}>
            <NavigationIcon />
          </View>
          <View style={{gap: 2}}>
            <Text
              style={[globalStlyes.text12, {color: 'rgba(123, 141, 149, 1)'}]}>
              Location
            </Text>
            <Text
              style={[
                globalStlyes.text12,
                {color: 'rgba(123, 141, 149, 1)', width: 200},
              ]}>
              {userAddress}
            </Text>
          </View>
          {isSelectLocation && (
            <View style={{marginLeft: 25}}>
              <CheckIcon />
            </View>
          )}
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.locationContainer}>
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
        </TouchableOpacity> */}
        <View style={{flex: 1}}>
          {/* {initialRegion && userCurrentLocation ? ( */}
          <MapView
            style={{flex: 1}}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            initialRegion={initialRegion}
            region={userCurrentLocation ?? initialRegion}
            // onPress={handleMapPress}
          >
            {markerCoordinate && <Marker coordinate={markerCoordinate} />}
          </MapView>
          {/* ) : null} */}
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
