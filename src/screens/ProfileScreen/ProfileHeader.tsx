import {View, Image, Text} from 'react-native';
import styles from './styles';
import user from '../../assets/data/user.json';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationProp} from '../../navigation/types';
import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
} from '@aws-amplify/ui-react-native';
const ProfileHeader = () => {
  const {signOut} = useAuthenticator();
  const navigation = useNavigation<ProfileNavigationProp>();
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Image source={{uri: user.image}} style={styles.avatar} />
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>120</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>134</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>

      {/* Button Row*/}
      <View style={styles.buttonRow}>
        <Button
          text="Edit Profile"
          onPress={() => navigation.navigate('Edit Profile')}
        />
        <Button text="Sign out" onPress={signOut} />
      </View>
    </View>
  );
};

export default ProfileHeader;
