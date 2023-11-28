import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {primaryColor} from '../../../utils/colors';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {useState} from 'react';

const ProviderDashboard = () => {
  const [activeText, setActiveText] = useState<string>('');

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={[
          styles.headingContainer,
          activeText === 'mathcedTask' && activeContainerStyles,
        ]}>
        <Text
          style={[
            globalStlyes.text14,
            {
              color:
                activeText === 'mathcedTask'
                  ? primaryColor
                  : 'rgba(32, 32, 32, 0.2)',
            },
          ]}>
          Matched Tasks
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.headingContainer,
          activeText === 'matchedProviders' && activeContainerStyles,
        ]}>
        <Text
          style={[
            globalStlyes.text14,
            {
              color:
                activeText === 'matchedProviders'
                  ? primaryColor
                  : 'rgba(32, 32, 32, 0.2)',
            },
          ]}>
          Matched Providers
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProviderDashboard;

const styles = StyleSheet.create({
  headingContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 6,
    borderBottomWidth: 3,
  },
});
