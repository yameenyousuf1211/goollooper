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
const PolicyScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.policies}>
              We reserve the right to request that you remove all links or any
              particular link to our Website. You approve to immediately remove
              all links to our Website upon request. We also reserve the right
              to amen these terms and conditions and it’s linking policy at any
              time. By continuously linking to our Website, you agree to be
              bound to and follow these linking terms and conditions.
            </Text>
            <Text style={styles.policies}>
              Removal of links from our website
            </Text>
            <Text style={styles.policies}>
              If you find any link on our Website that is offensive for any
              reason, you are free to contact and inform us any moment. We will
              consider requests to remove links but we are not obligated to or
              so or to respond to you directly.
            </Text>
            <Text style={styles.policies}>
              We do not ensure that the information on this website is correct,
              we do not warrant its completeness or accuracy; nor do we promise
              to ensure that the website remains available or that the material
              on the website is kept up to date.
            </Text>

            <Text style={styles.policies}>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties and conditions relating to our website
              and the use of this website. Nothing in this disclaimer will:
            </Text>

            <Text style={styles.policies}>
              limit or exclude our or your liability for death or personal
              injury;
            </Text>
            <Text style={styles.policies}>
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
            </Text>
            <Text style={styles.policies}>
              limit any of our or your liabilities in any way that is not
              permitted under applicable law; or exclude any of our or your
              liabilities that may not be excluded under applicable law.
            </Text>
            <Text style={styles.policies}>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties and conditions relating to our website
              and the use of this website. Nothing in this disclaimer will:
            </Text>
            <Text style={styles.policies}>
              limit or exclude our or your liability for death or personal
              injury;
            </Text>
            <Text style={styles.policies}>
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PolicyScreen;

const styles = StyleSheet.create({
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
    gap: 12,
  },
  policies: {
    color: '#505355',
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: width * 0.032,
  },
});
