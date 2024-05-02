import {View, Image, Text} from 'react-native';
import styles from './styles';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationProp} from '../../types/navigation';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {User} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useAuthContext} from '../../contexts/AuthContext';

interface IProfileHeader {
  user: User;
}
const ProfileHeader = ({user}: IProfileHeader) => {
  const currentUser = useAuthContext();
  const {signOut} = useAuthenticator();
  const navigation = useNavigation<ProfileNavigationProp>();
  navigation.setOptions({title: user.username || 'Profile'});

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Image
          source={{uri: user.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts || '0'}</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      {/* Button Row*/}
      {user.id === currentUser?.user?.userId && (
        <View style={styles.buttonRow}>
          <Button
            text="Edit Profile"
            onPress={() => navigation.navigate('Edit Profile')}
            inline
          />
          <Button text="Sign out" onPress={signOut} inline />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
