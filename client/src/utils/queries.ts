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

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      eventName
      eventDate
      eventLocation
    }
  }
`;
