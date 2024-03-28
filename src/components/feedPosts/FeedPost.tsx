import {Image, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import Comment from '../Comment';
import styles from './styles';

const FeedPost = ({post}) => {
  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.user.image,
          }}
          style={styles.userAvatar}
        />
        <Text style={styles.userName}>{post.user.username}</Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>
      {/* Content */}
      <Image
        source={{
          uri: post.image,
        }}
        style={styles.image}
      />
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={'hearto'}
            size={24}
            style={styles.icon}
            color={colors.black}
          />
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
          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>

        {/* Likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>{post.user.username}</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text>

        {/* Post description */}
        <Text style={styles.text}>
          <Text style={styles.bold}>{post.user.username}</Text>
          {post.description}
        </Text>

        {/* Comments */}
        <Text>
          View all <Text>{post.nofComments}</Text> comments
        </Text>

        <Comment />
        {/* Popsted date */}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
