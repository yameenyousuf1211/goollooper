import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_ALI_KEY} from '../../../../api/constant';
import {horizontalScale, verticalScale} from '../../../../utils/metrics';

const MapScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const mapRef = useRef<any>();
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(
    undefined,
  );
  const [userCurrentLocation, setUserCurrentLocation] = useState<
    Region | undefined
  >(undefined);
  const [searchedLocation, setSearchedLocation] = useState<Region | undefined>(
    undefined,
  );
  const [markerCoordinate, setMarkerCoordinate] = useState<Region | undefined>(
    undefined,
  );
  const [userAddress, setUserAddress] = useState<string>('Loading...');
  const [searchedAddress, setSearchedAddress] = useState<string>('Loading...');

  const [selectLocation, setSelectLocation] = useState<string>('');
  const [isAddMoreClicked, setIsAddMoreClicked] = useState<boolean>(false);

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
      const apiKey = GOOGLE_ALI_KEY;
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
    if (searchedLocation) {
      setSearchedLocation(searchedLocation);
    }
  }, [searchedLocation]);

  useEffect(() => {
    const headerRightButton = (
      <TouchableOpacity
        disabled={selectLocation === ''}
        onPress={handleSelectLocation}>
        <View style={{marginRight: 16}}>
          <Text
            style={[
              globalStlyes.text14,
              {
                color:
                  selectLocation !== ''
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
  }, [navigation, selectLocation]);

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
        <View
          style={{
            borderRadius: 12,
            marginHorizontal: horizontalScale(16),
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            position: 'relative',
          }}>
          <View style={{position: 'absolute', left: 10}}>
            <SearchIcon />
          </View>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details) => {
              console.log('Location:', details?.geometry);
              try {
                if (details) {
                  const {lat, lng} = details.geometry.location;
                  const location: Region = {
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  };
                  setInitialRegion(location);
                  setSearchedLocation(location);
                  setMarkerCoordinate(location);
                  setSearchedAddress(
                    details?.formatted_address || 'Loading...',
                  );
                  mapRef.current.animateToRegion(location, 1000); // Adjust the duration as needed
                }
              } catch (error) {
                console.error('Error in onPress callback:', error);
              }
            }}
            query={{
              key: GOOGLE_ALI_KEY,
              language: 'en',
            }}
            // currentLocation={true}
            // currentLocationLabel="Current Location"
            enablePoweredByContainer={false}
            fetchDetails={true}
            styles={{
              textInput: {
                height: '100%',
                color: '#000',
                backgroundColor: 'rgba(118, 118, 128, 0.12)',
                borderRadius: 12,
                zIndex: 1,
                paddingLeft: 30,
              },
              description: {
                color: '#000',
              },
              listView: {
                position: 'absolute',
                top: verticalScale(40) + 2,
                backgroundColor: '#fff',
                zIndex: 1,
              },
            }}
          />
        </View>
        {searchedLocation && (
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() =>
              selectLocation == 'search'
                ? setSelectLocation('')
                : setSelectLocation('search')
            }>
            <View style={styles.iconContainer}>
              <NavigationIcon />
            </View>
            <View style={{gap: 2}}>
              <Text
                style={[
                  globalStlyes.text12,
                  {color: 'rgba(123, 141, 149, 1)'},
                ]}>
                Location
              </Text>
              <Text
                style={[
                  globalStlyes.text12,
                  {color: 'rgba(123, 141, 149, 1)', width: 200},
                ]}>
                {searchedAddress}
              </Text>
            </View>
            {selectLocation == 'search' && (
              <View style={{marginLeft: 25}}>
                <CheckIcon />
              </View>
            )}
          </TouchableOpacity>
        )}
        {isAddMoreClicked && (
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() =>
              selectLocation == 'current'
                ? setSelectLocation('')
                : setSelectLocation('current')
            }>
            <View style={styles.iconContainer}>
              <MarkerPinIcon />
            </View>
            <View style={{gap: 2}}>
              <Text
                style={[
                  globalStlyes.text12,
                  {color: 'rgba(123, 141, 149, 1)'},
                ]}>
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
            {selectLocation == 'current' && (
              <View style={{marginLeft: 25}}>
                <CheckIcon />
              </View>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{position: 'relative', width: '100%', marginBottom: 20}}
          onPress={() => setIsAddMoreClicked(true)}>
          <Text
            style={[
              globalStlyes.text14,
              {color: primaryColor, position: 'absolute', right: 20},
            ]}>
            Add more
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          {/* {initialRegion && userCurrentLocation ? ( */}
          <MapView
            ref={mapRef}
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
