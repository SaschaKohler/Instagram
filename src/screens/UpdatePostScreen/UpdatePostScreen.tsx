import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  CreateNavigationProp,
  UpdatePostRouteProp,
} from '../../types/navigation';
import colors from '../../theme/colors';
import {useMutation, useQuery} from '@apollo/client';
import {createPost, getPost, updatePost} from './queries';
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const UpdatePostScreen = () => {
  const {user} = useAuthContext();
  const navigation = useNavigation<CreateNavigationProp>();
  const [description, setDescription] = useState('');
  const route = useRoute<UpdatePostRouteProp>();
  const {id} = route.params;

  const {data, loading, error, refetch} = useQuery<
    GetPostQuery,
    GetPostQueryVariables
  >(getPost, {variables: {id}});
  const post = data?.getPost;
  const [
    doUpdatePost,
    {data: updateData, loading: updateLoading, error: updateError},
  ] = useMutation<UpdatePostMutation, UpdatePostMutationVariables>(updatePost);

  useEffect(() => {
    if (post) {
      setDescription(post?.description || '');
    }
  }, [post]);

  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  }, [updateData, navigation]);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="Error fetching/updating/deleting the user"
        message={error?.message || updateError?.message}
        onRetry={() => refetch()}
      />
    );
  }
  const submit = async () => {
    if (!post) {
      return;
    }
    doUpdatePost({
      variables: {input: {id: post.id, description: description}},
    });
  };

  //   id?: string | null,
  // description?: string | null,
  // image?: string | null,
  // images?: Array< string > | null,
  // video?: string | null,
  // nofLikes: number,
  // nofComments: number,
  // userID: string,

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      <Button title="Submit" onPress={submit} style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  input: {
    alignSelf: 'stretch',
    marginVertical: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 3,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
  button: {
    color: colors.primary,
  },
});

export default UpdatePostScreen;
