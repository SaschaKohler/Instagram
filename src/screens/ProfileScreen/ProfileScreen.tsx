import user from '../../assets/data/user.json';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  UserProfileNavigationProp,
  MyProfileNavigationProp,
  UserProfileRouteProp,
  MyProfileRouteProp,
} from '../../navigation/types';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  // const userId = route.params?.userId;
  // query user with userId

  return <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
