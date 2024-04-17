import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import {ProfileStackNavigatorParamList} from './types';
import {Authenticator} from '@aws-amplify/ui-react-native';

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamList>();

const ProfileStackNavigator = () => {
  return (
    <Authenticator.Provider>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      </Stack.Navigator>
    </Authenticator.Provider>
  );
};

export default ProfileStackNavigator;
