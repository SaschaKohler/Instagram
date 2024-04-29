import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
// import user from '../../assets/data/user.json';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {Control, Controller, set, useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../API';
import {useMutation, useQuery} from '@apollo/client';
import {getUser, updateUser} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import Navigation from '../../navigation';
import {useNavigation} from '@react-navigation/native';
import {deleteUser} from './queries';
import {deleteUser as authDeleteUser} from 'aws-amplify/auth';
import {useAuthenticator} from '@aws-amplify/ui-react-native';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rules?: object;
}

const CustomInput = ({
  control,
  name,
  label,
  rules = {},
  multiline = false,
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{flex: 1}}>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={[
                styles.input,
                {borderColor: error ? colors.error : colors.border},
              ]}
              multiline={multiline}
            />
            {error && (
              <Text style={{color: colors.error}}>
                {error.message || 'Error'}
              </Text>
            )}
          </View>
        </View>
      );
    }}
  />
);

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const {control, handleSubmit, setValue} = useForm<IEditableUser>();
  const navigation = useNavigation();
  const {user, signOut, route} = useAuthenticator();
  // const {user} = useAuthContext();
  // const userId = currentUser.user?.userId;

  console.log('EditProfileScreen: user: ', user);

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: user.userId}});

  const authUser = data?.getUser;
  console.log(user.signInDetails);

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
    navigation.goBack();
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

  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || authUser?.image}}
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

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  textButton: {
    margin: 10,
    color: colors.primary,
    fontWeight: fonts.weight.semi,
  },
  textButtonDanger: {
    margin: 10,
    color: colors.error,
    fontWeight: fonts.weight.semi,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
  },
});

export default EditProfileScreen;
