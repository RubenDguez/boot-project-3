import { gql } from "@apollo/client";

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
// find user's charities
export const USER_CHARITIES = gql`
  query FindUserCharities {
    findUserCharities {
      _id
      name
      description
      image
      website
      locationAddress
    }
  }
`;
// find user's events
export const GET_EVENTS = gql`
  query MyEvents {
    me {
      events {
        _id
        eventName
        eventDate
        eventLocation
        eventImage
      }
    }
  }
`;

export const FIND_ALL_POST = gql`
  query Query {
  findAllHelpBoards {
    _id
    title
    description
    date
    status
    createdBy
    completedBy
    type
  }
}
`;
