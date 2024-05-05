import {gql} from '@apollo/client';

export const deletePost = gql`
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const createLike = gql`
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      userID
      postID
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
      Post {
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
          }
          nextToken
          __typename
        }
        Comments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

// export const createLike = gql`
//   mutation CreateLike(
//     $input: CreateLikeInput!
//     $condition: ModelLikeConditionInput
//   ) {
//     createLike(input: $input, condition: $condition) {
//       id
//       userID
//       postID
//       createdAt
//       updatedAt
//       __typename
//     }
//   }
// `;
//
export const LikesForPostByUser = gql`
  query LikesForPostByUser(
    $postID: ID!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    LikesForPostByUser(
      postID: $postID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;

export const deleteLike = gql`
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      userID
      postID
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
      Post {
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
          nofFollowers
          nofFollowings
          nofPosts
          createdAt
          updatedAt
          __typename
        }
        Likes {
          nextToken
          __typename
        }
        Comments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

// export const deleteLike = gql`
//   mutation DeleteLike(
//     $input: DeleteLikeInput!
//     $condition: ModelLikeConditionInput
//   ) {
//     deleteLike(input: $input, condition: $condition) {
//       id
//       userID
//       postID
//       createdAt
//       updatedAt
//       __typename
//     }
//   }
// `;

export const updatePost = gql`
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      nofLikes
      createdAt
      updatedAt
      __typename
    }
  }
`;
