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

  type Charity {
    _id: ID!
    name: String!
    description: String!
    image: String!
    website: String!
    locationAddress: String!
    nonprofitTags: [String]!
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

  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    addCharity(input: CharityInput!): User
  }
`;

export default typeDefs;
