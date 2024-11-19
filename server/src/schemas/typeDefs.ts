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
}

  type Auth {
    token: ID!
    user: User
  }

  type Charity {
    _id: ID!
    name: String!
    description: String!
    image: String
    website: String
    locationAddress: String!
    # nonprofitTags: [String]!
  }

  type Event {
    _id: ID!
    eventName: String!
    eventDate: String!
    eventLocation: String!
    eventImage: String!
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
    nonprofitTags: [String]!
  }
  input EventInput {
    eventName: String!
    eventDate: String!
    eventLocation: String!
    eventImage: String!
  }

  type Query {
    me: User
    posts: [Post]!
    post(id: ID!): Post
    searchCharities(city: String, cause: String): [Charity]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    createPost(title: String!, description: String!, payment: String!): Post
    completePost(postId: ID!): Post
    addCharity(input: CharityInput!): User
    addEvent(input: EventInput!): Event
  }
`;

export default typeDefs;
