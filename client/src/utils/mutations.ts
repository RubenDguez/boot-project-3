import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      email
      firstName
      lastName
      username
    }
  }
}
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        email
        firstName
        lastName
        username
      }
    }
  }
`;
