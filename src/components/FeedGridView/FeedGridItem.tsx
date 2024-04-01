import {Image, View} from 'react-native';
import {IPost} from '../../types/models';

const FeedGridItem = ({post}: {post: IPost}) => {
  return (
    <View style={{flex: 1, padding: 1, aspectRatio: 1, maxWidth: '33%'}}>
      <Image source={{uri: post.image || post.images[0]}} style={{flex: 1}} />
    </View>
  );
};

export default FeedGridItem;
