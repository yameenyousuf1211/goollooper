import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {primaryColor, secondaryTextColor} from '../utils/colors';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const LoginScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={{gap: height * 0.032}}>
              <View>
                <Image
                  source={require('../assets/pictorial-logo.png')}
                  style={{width: width * 0.2, height: width * 0.2}}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: primaryColor,
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize: width * 0.05,
                  }}>
                  Wellcome Back To Goollooper
                </Text>
              </View>
            </View>
            <View style={styles.inputFieldsContainer}>
              <View>
                <Text
                  style={{
                    color: secondaryTextColor,
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize: width * 0.038,
                  }}>
                  Email Address
                </Text>
                <TextInput
                  placeholder="Type here"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#EDEDED',
                    paddingVertical: 10,
                    color: 'rgb(22, 26, 29)',
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize: width * 0.038,
                  }}
                />
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      color: secondaryTextColor,
                      fontFamily: 'SpaceGrotesk-Medium',
                      fontSize: width * 0.038,
                    }}>
                    Password
                  </Text>
                  <TextInput
                    placeholder="Type here"
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#EDEDED',
                      paddingVertical: 10,
                      color: 'rgb(22, 26, 29)',
                      fontFamily: 'SpaceGrotesk-Medium',
                      fontSize: width * 0.038,
                    }}
                  />
                </View>
                <View
                  style={{alignSelf: 'flex-end', paddingTop: height * 0.018}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text
                      style={{
                        color: '#FF3232',
                        fontSize: width * 0.038,
                        fontFamily: 'SpaceGrotesk-Regular',
                      }}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{width: '100%', paddingBottom: height * 0.012}}>
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
                      fontSize: 14,
                    }}>
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: height * 0.026,
              }}>
              <View
                style={{width: '40%', height: 1, backgroundColor: '#EDEDED'}}
              />
              <View>
                <Text>or</Text>
              </View>
              <View
                style={{width: '40%', height: 1, backgroundColor: '#EDEDED'}}
              />
            </View>
            <View style={{paddingVertical: height * 0.046}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                <View>
                  <TouchableOpacity>
                    <View style={{width: 35, height: 35}}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={require('../assets/icons/google-icon.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity>
                    <View style={{width: 35, height: 35}}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={require('../assets/icons/facebook-icon.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity>
                    <View style={{width: 35, height: 35}}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={require('../assets/icons/apple-icon.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{gap: height * 0.046}}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: secondaryTextColor,
                      fontFamily: 'SpaceGrotesk-Regular',
                      fontSize: width * 0.032,
                    }}>
                    Don't have an account yet?{' '}
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: primaryColor,
                        fontFamily: 'SpaceGrotesk-Regular',
                        fontSize: width * 0.032,
                      }}>
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>By signing in to you account, you agree to our</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Policy')}>
                      <Text style={{color: primaryColor}}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <Text> and </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Terms')}>
                      <Text style={{color: primaryColor}}>
                        Terms & Conditions
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(211,211,211)',
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
    backgroundColor: '#FFF',
  },
  contentContainer: {
    width: '90%',
    paddingVertical: height * 0.032,
  },
  logoContainer: {
    // width: "60%"
  },
  sloganContainer: {
    // width: "90%",
    // borderWidth: 1
  },
  slogan: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  inputFieldsContainer: {
    paddingVertical: height * 0.056,
    gap: height * 0.03,
  },
});
