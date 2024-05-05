import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from '../../API';
import {LikesForPostByUser} from './queries';
import UserListItem from '../../components/UserListItem/UserListItem';
import {PostLikesRouteProp} from '../../types/navigation';
import {useRoute} from '@react-navigation/native';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const PostLikesScreen = () => {
  const route = useRoute<PostLikesRouteProp>();
  const {id} = route.params;
  const {data, loading, error, refetch} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(LikesForPostByUser, {variables: {postID: id}});
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Error fetching Likes" message={error?.message} />
    );
  }
  const likes = data?.LikesForPostByUser?.items || '';
  return (
    <FlatList
      data={likes}
      renderItem={({item}) => <UserListItem user={item?.User} />}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

export default PostLikesScreen;
