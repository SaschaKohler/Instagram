import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CreateNavigationProp, CreateRouteProp} from '../../types/navigation';
import colors from '../../theme/colors';
import {useMutation} from '@apollo/client';
import {createPost} from './queries';
import {CreatePostMutation, CreatePostMutationVarables} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const CreatePostScreen = () => {
  const {user} = useAuthContext();
  const navigation = useNavigation<CreateNavigationProp>();
  const [description, setDescription] = useState('');
  const [doCreatePost, {data, loading, error}] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);
  const route = useRoute<CreateRouteProp>();
  const {image, images, video} = route.params;
  let content;

  if (image) {
    content = <Image source={{uri: image}} style={styles.image} />;
  } else if (images) {
    console.log(images);

    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }
  const submit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            description,
            image: image,
            images: images,
            video: video,
            nofLikes: 0,
            nofComments: 0,
            userID: user?.userId,
          },
        },
      });
      console.log(response);
      navigation.navigate('Camera');
      navigation.navigate('HomeStack');
    } catch (e) {
      Alert.alert((e as Error).message);
    }
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
      <View style={styles.content}>{content}</View>
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

export default CreatePostScreen;
