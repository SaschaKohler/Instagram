import {ActivityIndicator, Alert, Image, Text, View} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {deleteUser as authDeleteUser} from 'aws-amplify/auth';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useAuthContext} from '../../contexts/AuthContext';
import {deleteUser, getUser, updateUser, usersByUsername} from './queries';
import styles from './styles';
import CustomInput, {IEditableUser} from './CustomInput';
import {DEFAULT_USER_IMAGE} from '../../config';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const {control, handleSubmit, setValue} = useForm<IEditableUser>();
  const navigation = useNavigation();
  const {user} = useAuthContext();

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: user?.userId}});

  const [
    getUsersByUsername,
    {data: userData, loading: userLoading, error: userError},
  ] = useLazyQuery<UsersByUsernameQuery, UsersByUsernameQueryVariables>(
    usersByUsername,
  );
  const authUser = data?.getUser;

  useEffect(() => {
    if (authUser) {
      setValue('name', authUser.name);
      setValue('username', authUser.username);
      setValue('website', authUser.website);
      setValue('bio', authUser.bio);
    }
  }, [authUser, setValue]);

  const [
    doUpdateUser,
    {data: updateData, loading: updateLoading, error: updateError},
  ] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  const [
    doDelete,
    {data: deleteData, loading: deleteLoading, error: deleteError},
  ] = useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || deleteError || updateError) {
    return (
      <ApiErrorMessage
        title="Error fetching/updating/deleting the user"
        message={error?.message || deleteError?.message || updateError?.message}
        onRetry={() => refetch()}
      />
    );
  }

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting youre UserProfile is permanent!', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, delete',
        style: 'destructive',
        onPress: startDeleting,
      },
    ]);
  };
  const handleDeleteUser = async () => {
    try {
      await authDeleteUser();
    } catch (error) {
      console.log(error);
    }
  };

  const startDeleting = async () => {
    if (!authUser) {
      return;
    }
    await doDelete({variables: {input: {id: authUser?.id}}});

    handleDeleteUser();
  };

  const onSubmit = async (formData: IEditableUser) => {
    await doUpdateUser({
      variables: {input: {id: authUser?.id, ...formData}},
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0)
          setSelectedPhoto(assets[0]);
      },
    );
  };

  const validateUsername = async (username: string) => {
    // query the database based on the username with userByUsername

    try {
      const response = await getUsersByUsername({
        variables: {username: username},
      });
      if (response.error) {
        Alert.alert('Error fetching username');
        return 'Error fetching username';
      }
      const users = response.data?.usersByUsername?.items;
      if (users && users?.length > 0) {
        return 'Username already taken.';
      }
    } catch (error) {
      Alert.alert('Error fetching username by username');
    }

    return true;
  };

  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: selectedPhoto?.uri || authUser?.image || DEFAULT_USER_IMAGE,
        }}
        style={styles.avatar}
      />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change Profile Photo
      </Text>
      <CustomInput
        name="name"
        control={control}
        label="Name"
        rules={{
          required: 'Name is required',
          maxLength: {
            value: 35,
            message: 'max 35 chars',
          },
          minLength: {
            value: 3,
            message: 'min 3 chars',
          },
        }}
      />
      <CustomInput
        name="username"
        control={control}
        label="Username"
        rules={{
          required: 'Username is required',
          maxLength: {
            value: 35,
            message: 'max 35 chars',
          },
          minLength: {
            value: 3,
            message: 'min 3 chars',
          },
          validate: validateUsername,
        }}
      />
      <CustomInput
        name="website"
        control={control}
        rules={{
          required: true,
          pattern: {value: URL_REGEX, message: 'Invalid url'},
        }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          maxLength: {
            value: 200,
            message: 'max 200 chars',
          },
        }}
        label="Bio"
        multiline
      />
      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        {updateLoading ? 'Submitting ...' : 'Submit'}
      </Text>
      <Text onPress={confirmDelete} style={styles.textButtonDanger}>
        {deleteLoading ? 'Deleting ...' : 'DELETE USER'}
      </Text>
    </View>
  );
};

export default EditProfileScreen;
