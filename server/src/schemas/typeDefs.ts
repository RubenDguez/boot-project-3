import gql from "graphql-tag";

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    username: String
    email: String
    events: [Event]
    charities: [Charity]
    helpBoards: [HelpBoard]
  }


  type Post {
  _id: ID!
  title: String!
  description: String!
  payment: String!
  status: String!
  createdBy: User!
  completedBy: User
  createdAt: String!
  type: String!
  }


  type Charity {
    _id: ID!
    name: String!
    description: String!
    image: String
    website: String
    locationAddress: String!
  }

  type Event {
    _id: ID!
    eventName: String!
    eventDate: String!
    eventLocation: String!
    eventImage: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  input CharityInput {
    name: String!
    description: String!
    image: String!
    website: String!
    locationAddress: String!
  }

  type HelpBoard {
    _id: ID!
    title: String!
    description: String!
    date: String!
    status: String!
    createdBy: String!
    completedBy: String!
    type: String!
  }

  input HelpBoardInput {
    title: String!
    description: String!
    date: String!
    status: String!
    createdBy: String!
    completedBy: String!
    type: String!
  }
    
  input EventInput {
    eventName: String!
    eventDate: String!
    eventLocation: String!
    eventImage: String!
  }

  type Query {
    me: User
    charities: [Charity]
    charity(_id: ID!): Charity
    posts: [Post]!
    post(id: ID!): Post
    searchCharities(city: String, cause: String): [Charity]
    events: [Event]
    findUserCharities: [Charity]
    findAllHelpBoards: [HelpBoard]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    addCharity(input: CharityInput!): Charity
    createPost(title: String!, description: String!, payment: String!): Post
    completePost(postId: ID!): Post
    removeCharity(charityId: ID!): User
    addHelpBoard(input: HelpBoardInput!): User
    removeHelpBoard(helpBoardId: ID!): User
    addEvent(input: EventInput!):Event
    deleteEvent(eventId: ID!): Event
  }
`;

export default typeDefs;
