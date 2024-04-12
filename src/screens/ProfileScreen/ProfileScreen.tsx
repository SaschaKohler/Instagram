import user from '../../assets/data/user.json';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const userId = route.params?.userId;
  // query user with userId

  return <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
