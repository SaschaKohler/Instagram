import {View, FlatList, ViewToken, ViewabilityConfig} from 'react-native';
import FeedPost from '../../components/feedPosts/';
import posts from '../../assets/data/posts.json';
import {useState, useRef} from 'react';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const viewabilityConfig: ViewabilityConfig = useRef({
    itemVisiblePercentThreshold: 51,
  });

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
        console.log(viewableItems[0].item.id);
      }
    },
  );

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={activePostId === item.id} />
      )}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
    />
  );
};

export default HomeScreen;
