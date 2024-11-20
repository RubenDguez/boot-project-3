import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      email
      firstName
      lastName
      username
    }
  }
`;

export const SEARCH_CHARITIES = gql`
  query Query($city: String, $cause: String) {
    searchCharities(city: $city, cause: $cause) {
      _id
      description
      image
      locationAddress
      name
      website
    }
  }
`;
