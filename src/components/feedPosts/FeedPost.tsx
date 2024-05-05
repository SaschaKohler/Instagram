import {Image, Pressable, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import Comment from '../Comment';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import {useState} from 'react';
import styles from './styles';
import VideoPlayer from '../VideoPlayer';

import {useNavigation} from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';
import PostMenu from './PostMenu';
import {useMutation, useQuery} from '@apollo/client';
import {
  LikesForPostByUser,
  createLike,
  deleteLike,
  updatePost,
} from './queries';
import {useAuthContext} from '../../contexts/AuthContext';

interface IFeedPost {
  post: Post;
  isVisible: boolean;
}

const FeedPost = ({post, isVisible}: IFeedPost) => {
  const {user} = useAuthContext();
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isBookmarked, setBookmark] = useState(false);
  const navigation = useNavigation<FeedNavigationProp>();

  const [doCreateLike] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: {input: {userID: user?.userId, postID: post.id}},
    refetchQueries: ['LikesForPostByUser'],
  });

  const [doDeleteLike] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLike, {refetchQueries: ['LikesForPostByUser']});

  const {data: usersLikeData} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(LikesForPostByUser, {
    variables: {postID: post.id, userID: {eq: user?.userId}},
  });

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const userLike = usersLikeData?.LikesForPostByUser?.items?.[0];

  const postLikes = post.Likes?.items;

  const navigateToUser = () => {
    if (post.User) {
      navigation.navigate('UserProfile', {userId: post.User?.id});
    }
  };
  const navigateToLikesPage = () => {
    navigation.navigate('PostLikes', {id: post.id});
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };
  const toggleIsBookmarked = () => {
    setBookmark(v => !v);
  };

  const incrementNofLikes = (amount: 1 | -1) => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          nofLikes: post.nofLikes + amount,
        },
      },
    });
  };

  const toggleIsLiked = () => {
    if (userLike) {
      doDeleteLike({variables: {input: {id: userLike.id}}});
      incrementNofLikes(-1);
    } else {
      doCreateLike();
      incrementNofLikes(1);
    }
  };
  const toggleDescriptionExpanded = () => {
    setDescriptionExpanded(v => !v);
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleIsLiked}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleIsLiked} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleIsLiked}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.User?.image || DEFAULT_USER_IMAGE,
          }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>
        <PostMenu post={post} />
      </View>
      {/* Content */}
      {content}
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleIsLiked}>
            <AntDesign
              name={userLike ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={userLike ? colors.accent : colors.black}
            />
          </Pressable>
          <IonIcons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Pressable onPress={toggleIsBookmarked}>
            <IonIcons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              style={{marginLeft: 'auto'}}
              color={colors.black}
            />
          </Pressable>
        </View>

        {/* Likes */}
        {postLikes?.length === 0 ? (
          <Text>Be the first to like the post!</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikesPage}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes?.length > 1 && (
              <>
                {' '}
                and <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
              </>
            )}
          </Text>
        )}

        {/* Post description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 2}>
          <Text style={styles.bold}>{post.User?.username}</Text>
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        <Text onPress={navigateToComments}>
          View all <Text>{post.nofComments}</Text> comments
        </Text>
        {(post.Comments?.items || []).map(
          comment => comment && <Comment key={comment?.id} comment={comment} />,
        )}

        {/* Popsted date */}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
