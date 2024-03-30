import {View, FlatList} from 'react-native';
import FeedPost from '../../components/feedPosts/';
import posts from '../../assets/data/posts.json';

const HomeScreen = () => {
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <FeedPost post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
