import {gql} from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
        items {
          id
          image
          images
          video
        }
      }
      nofFollowers
      nofFollowings
      createdAt
      updatedAt
      __typename
    }
  }
`;
