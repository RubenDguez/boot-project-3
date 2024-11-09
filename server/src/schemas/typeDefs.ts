import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    username: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
  }
`;

export default typeDefs;
