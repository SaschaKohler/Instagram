import {Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from './src/theme/colors';
import fonts from './src/theme/fonts';

const App = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          color: colors.primary,
          fontSize: fonts.size.lg,
          fontWeight: fonts.weight.full,
        }}>
        Hello World!
      </Text>
      <AntDesign name="home" size={24} />
    </View>
  );
};

export default App;
