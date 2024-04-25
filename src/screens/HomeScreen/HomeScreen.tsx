import {View, FlatList, ViewToken, ViewabilityConfig} from 'react-native';
import FeedPost from '../../components/feedPosts/';
// import posts from '../../assets/data/posts.json';
import {useState, useRef, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api';
// import {listPosts, listUsers} from '../../graphql/queries';

const client = generateClient();

export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        image
        images
        video
        nofLikes
        nofComments
        userID
        createdAt
        updatedAt
        __typename
        User {
          id
          name
          username
          image
        }
        Comments {
          items {
            id
            comment
            User {
              id
              username
            }
          }
        }
      }
      nextToken
      __typename
    }
  }
`;
const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const response = await client.graphql({query: listPosts});
    console.log(response.data.listPosts.items);
    setPosts(response.data.listPosts.items);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
