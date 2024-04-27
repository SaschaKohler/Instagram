import {FlatList, ActivityIndicator} from 'react-native';
import UserListItem from '../../components/UserListItem';
import {listUsers} from './queries';
import {useQuery} from '@apollo/client';
import {ListUsersQuery, ListUsersQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const UserSearchScreen = () => {
  const {data, loading, error, refetch} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers);

  const users = data?.listUsers?.items || [];

  console.log(users);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !users) {
    return (
      <ApiErrorMessage
        title="Error fetching the users"
        message={error?.message || 'Users not found'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={({item}) => <UserListItem user={item} />}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default UserSearchScreen;
