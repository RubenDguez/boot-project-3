import gql from "graphql-tag";

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

  type Charity {
    _id: ID!
    name: String!
    description: String!
    image: String!
    website: String!
    locationAddress: String!
    nonprofitTags: [String]!
  }

  type Query {
    charities: [Charity]
    charity(_id: ID!): Charity
  }

  input CharityInput {
    name: String!
    description: String!
    image: String!
    website: String!
    locationAddress: String!
    nonprofitTags: [String]!
  }

  type Mutation {
    addCharity(input: CharityInput!): User
  }
`;

export default typeDefs;
