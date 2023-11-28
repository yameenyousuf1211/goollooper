import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {secondaryTextColor} from '../../../utils/colors';

const {width, height} = Dimensions.get('screen');

const TermsScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={{color: secondaryTextColor, fontSize: width * 0.038}}>
              Welcome to goollooper.com!
            </Text>
            <Text style={{color: '#505355', fontSize: width * 0.032}}>
              These terms and conditions outline the rules and regulations for
              the use of Goollooper's Website, located at 222.goollooper.com.
            </Text>
            <Text style={{color: '#505355', fontSize: width * 0.032}}>
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use goollooper.com if you do not
              agree to take all of the terms and conditions stated on this page.
            </Text>
            <Text style={{color: '#505355', fontSize: width * 0.032}}>
              The following terminology applies to these Terms and Conditions,
              Privacy Statement and Disclaimer Notice and all Agreements:
              "Client", "You" and "Your" refers to you, the person log on this
              website and compliant to the Company’s terms and conditions. "The
              Company", "Ourselves", "We", "Our" and "Us", refers to our
              Company. "Party", "Parties", or "Us", refers to both the Client
              and ourselves. All terms refer to the offer, acceptance and
              consideration of payment necessary to undertake the process of our
              assistance to the Client in the most appropriate manner for the
              express purpose of meeting the Client’s needs in respect of
              provision of the Company’s stated services, in accordance with and
              subject to, prevailing law of Netherlands. Any use of the above
              terminology or other words in the singular, plural, capitalization
              and/or he/she or they, are taken as interchangeable and therefore
              as referring to same.
            </Text>
            <Text style={{color: '#505355', fontSize: width * 0.032}}>
              We employ the use of cookies. By accessing goollooper.com, you
              agreed to use cookies in agreement with the Goollooper's Privacy
              Policy.
            </Text>
            <Text style={{color: '#505355', fontSize: width * 0.032}}>
              Most interactive websites use cookies to let us retrieve the
              user’s details for each visit. Cookies are used by our website to
              enable the functionality of certain areas to make it easier for
              people visiting our website. Some of our affiliate/advertising
              partners may also use cookies.
            </Text>
            <Text style={{color: '#505355', fontSize: width * 0.032}}>
              We employ the use of cookies. By accessing goollooper.com, you
              agreed to use cookies in agreement with the Goollooper's Privacy
              Policy.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsScreen;

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
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
  },
  contentContainer: {
    width: '90%',
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: 20,
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
    gap: 22,
  },
});
