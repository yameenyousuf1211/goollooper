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
import {primaryColor} from '../utils/colors';

const {width, height} = Dimensions.get('screen');

const SplashScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../assets/splash-background.png')}
          style={[styles.background, {width: '100%', height: '100%'}]}
        />
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={{width: width * 0.54, height: width * 0.54}}
              resizeMode="contain"
              source={require('../assets/combination-logo.png')}
            />
          </View>
          <View style={styles.sloganContainer}>
            <Text style={styles.slogan}>
              Productivity with every connection
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View
                style={{
                  backgroundColor: primaryColor,
                  width: '100%',
                  height: 40,
                  borderRadius: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontFamily: 'SpaceGrotesk-Regular',
                    fontSize: width * 0.038,
                  }}>
                  Start
                </Text>
              </View>
            </TouchableOpacity>
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
  },
});
