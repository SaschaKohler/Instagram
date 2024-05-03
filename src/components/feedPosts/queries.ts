import {gql} from '@apollo/client';

export const deletePost = gql`
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      description
      image
      images
      video
      nofLikes
      nofComments
      userID
      User {
        id
        email
        name
        username
        bio
        website
        image
        Posts {
          nextToken
          __typename
        }
        Comments {
          nextToken
          __typename
        }
        Likes {
          nextToken
          __typename
        }
        nofFollowers
        nofFollowings
        nofPosts
        createdAt
        updatedAt
        __typename
      }
      Likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Comments {
        items {
          id
          comment
          userID
          postID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
