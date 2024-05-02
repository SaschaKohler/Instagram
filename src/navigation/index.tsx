import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import {RootNavigatorParamList} from './types';
import AuthStackNavigator from './AuthStackNavigator';
import {ActivityIndicator, View} from 'react-native';
import {useAuthContext} from '../contexts/AuthContext';
import {getUser} from './queries';
import {useQuery} from '@apollo/client';
import {GetUserQuery, GetUserQueryVariables} from '../API';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();
const linking: LinkingOptions<RootNavigatorParamList> = {
  prefixes: ['skitphotos://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Comments: 'comments',
      Home: {
        screens: {
          HomeStack: {
            initialRouteName: 'Feed',
            screens: {
              UserProfile: 'user/:userId',
            },
          },
        },
      },
    },
  },
};

const Navigation = () => {
  const {user} = useAuthContext();
  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: user?.userId}},
  );
  const userData = data?.getUser;
  console.log(userData);

  if (user === undefined || loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  let stackScreen = null;

  if (!user) {
    stackScreen = (
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigator}
        options={{headerShown: false}}
      />
    );
  } else if (!userData?.username || userData.username === userData.email) {
    stackScreen = (
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{title: 'Setup your Profile'}}
      />
    );
  } else {
    stackScreen = (
      <>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </>
    );
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {stackScreen}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
