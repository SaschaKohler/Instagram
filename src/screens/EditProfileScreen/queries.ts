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
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
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
  }
`;
