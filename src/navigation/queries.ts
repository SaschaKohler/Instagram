import {gql} from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      createdAt
      updatedAt
      __typename
    }
  }
`;
