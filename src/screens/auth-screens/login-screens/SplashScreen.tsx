import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {primaryColor} from '../../../utils/colors';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import { AWS_URL, DEV_BASE_URL, PROD_BASE_URL } from '../../../api/constant';

const {width, height} = Dimensions.get('screen');

const SplashScreen = ({navigation}: any) => {
  console.log(DEV_BASE_URL);
  console.log(PROD_BASE_URL);
  console.log(AWS_URL);


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/splash-background.png')}
          style={[styles.background, {width: '100%', height: '100%'}]}
        />
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={{width: width * 0.54, height: width * 0.54}}
              resizeMode="contain"
              source={require('../../../../assets/combination-logo.png')}
            />
          </View>
          <View style={styles.sloganContainer}>
            <Text style={styles.slogan}>
              Productivity with every connection
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <CustomButton onPress={() => navigation.navigate('Login')}>
              Start
            </CustomButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    // backgroundColor: 'rgb(211,211,211)',
    opacity: 0.1,
    flex: 1,
    position: 'absolute',
    // remove width and height to override fixed static size
    resizeMode: 'cover',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '(255, 255, 255, 0.90)',
    zIndex: 9999,
    opacity: 1,
  },
  contentContainer: {
    width: '90%',
    justifyContent: 'center',
    // borderWidth: 1,
    alignItems: 'center',
    gap: height * 0.07,
  },
  logoContainer: {
    // width: "60%"
  },
  sloganContainer: {
    // width: "90%",
    // borderWidth: 1
  },
  slogan: {
    fontSize: width * 0.038,
    fontFamily: 'SpaceGrotesk-Regular',
    color: 'rgba(54, 54, 54, 1)'
  },
});
