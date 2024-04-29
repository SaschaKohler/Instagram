import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import logo from '../assets/images/skIT.png';
import {Image, Text} from 'react-native';
import {HomeStackNavigatorParamList} from '../types/navigation';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import styles from '../components/Comment/styles';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HeaderTitle = () => {
  const {signOut, user} = useAuthenticator(context => [context.user]);
  return (
    <>
      <Image
        source={logo}
        resizeMode="contain"
        style={{width: 120, height: 40}}
      />
      <Text onPress={signOut}>SignOut</Text>
    </>
  );
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerTitle: HeaderTitle}}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
