import {
  Text,
  FlatList,
  ViewToken,
  ViewabilityConfig,
  ActivityIndicator,
  View,
} from 'react-native';
import FeedPost from '../../components/feedPosts/';
import {useState, useRef} from 'react';
import {listPosts} from './queries';
import {useQuery} from '@apollo/client';
import {ListPostsQuery, ListPostsQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const {data, loading, error, refetch} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);

  // const viewabilityConfig: ViewabilityConfig = useRef({
  //   itemVisiblePercentThreshold: 51,
  // });

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Some error occured!" message={error.message} />
    );
  }

  const posts = (data?.listPosts?.items || []).filter(post => !post?._deleted);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) =>
          item && <FeedPost post={item} isVisible={activePostId === item.id} />
        }
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        // viewabilityConfig={viewabilityConfig.current}
        refreshing={loading}
        onRefresh={() => refetch()}
      />
    </View>
  );
};
//
export default HomeScreen;
