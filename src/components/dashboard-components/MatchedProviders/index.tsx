import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import ChevronRightIcon from '../../../../assets/icons/ChevronRightIcon';
import StarIcon from '../../../../assets/icons/StarIcon';
import {primaryColor} from '../../../utils/colors';
import {useNavigation} from '@react-navigation/native';

interface Props {
  providers: any;
}

const MatchedProviders = ({providers}: Props) => {
  const navigation = useNavigation<any>();

  const renderProvider = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'column', marginBottom: 20, width: '100%',}}
        onPress={() => navigation.navigate('SPProfile')}
        >
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            width: '100%',
          }}>
          <Image
            source={{uri: item.image}}
            width={48}
            height={48}
            alt="img"
            style={styles.image}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomColor: 'rgba(237, 237, 237, 1)',
              borderBottomWidth: 1,
              gap: 10,
              width: '75%',
              paddingBottom: 16,
            }}>
            <View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={globalStlyes.text14}>{item.name}</Text>
                <View
                  style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                  <Text
                    style={[
                      globalStlyes.text12,
                      {
                        color: 'rgba(22, 26, 29, 1)',
                        fontWeight: '500',
                        fontFamily: 'SpaceGrotesk-Medium',
                      },
                    ]}>
                    5
                  </Text>
                  <StarIcon
                    width={10}
                    height={10}
                    fill="rgba(244, 140, 6, 1)"
                  />
                </View>
              </View>
              <View
                style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <Text
                  style={[
                    globalStlyes.text12,
                    {color: 'rgba(132, 132, 132, 1)'},
                  ]}>
                  {item.distance}
                </Text>
                <Text style={[globalStlyes.text12, {color: primaryColor}]}>
                  BSM
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(246, 246, 246, 1)',
                  padding: 8,
                  borderRadius: 12,
                  marginTop: 8,
                  paddingHorizontal: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width:100
                }}>
                <Text
                  style={{
                    color: 'rgba(22, 26, 29, 1)',
                  }}>
                  {item?.type}
                </Text>
              </View>
            </View>
            <View>
              <ChevronRightIcon />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{gap: 16, marginTop: 10,paddingLeft: 20}}>
      <Text style={globalStlyes.text16}>Matched Service Provider</Text>

      <View>
        <FlatList
          data={providers}
          renderItem={renderProvider}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default MatchedProviders;

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
});
