import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
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
  mutation AddUser($input: UserInput!) {
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

export const ADD_CHARITY = gql`
  mutation AddCharity($input: CharityInput!) {
    addCharity(input: $input) {
      _id
      email
      firstName
      lastName
      username
      charities {
        _id
        name
        description
        image
        website
        locationAddress
        nonprofitTags
      }
    }
  }
`;
export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $description: String!, $payment: String!) {
        createPost(title: $title, description: $description, payment: $payment) {
            _id
            title
            description
            payment
            status
            createdBy {
                username
            }
        }
    }
`;

export const COMPLETE_POST = gql`
    mutation CompletePost($postId: ID!) {
        completePost(postId: $postId) {
            _id
            status
            completedBy {
                username
            }
        }
    }
`;
