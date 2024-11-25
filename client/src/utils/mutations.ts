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
      name
      description
      locationAddress
      website
      image
    }
  }
`;
export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $description: String!, $payment: String!) {
        createPost(title: $title, description: $description) {
            _id
            title
            description
            status
            createdBy {
                username
            }
        }
    }
`;

export const COMPLETE_POST = gql`
    mutation completePost($postId: ID!) {
        completePost(postId: $postId) {
            _id
            status
            completedBy {
                username
            }
        }
    }
`;
// create event for user calendar
export const ADD_EVENT = gql`
  mutation addEvent($input: EventInput!) {
    addEvent(input: $input) {
      eventName
      eventDate
      eventLocation
      eventImage
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      _id
    }
  }
`;



export const REMOVE_CHARITY = gql`
  mutation RemoveCharity($charityId: ID!) {
    removeCharity(charityId: $charityId) {
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
export const ADD_POST = gql`
  mutation AddHelpBoard($input: HelpBoardInput!) {
    addHelpBoard(input: $input) {
      helpBoards {
        _id
        title
        description
        date
        status
        createdBy
        completedBy
      }
    }
  }
`;

export const REMOVE_HELP_BOARD = gql`
  mutation removeHelpBoard($helpBoardId: ID!) {
    removeHelpBoard(helpBoardId: $helpBoardId) {
      helpBoards {
        _id
        title
        description
      }
    }
  }
`;


