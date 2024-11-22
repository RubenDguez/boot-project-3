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
    charities: [Charity]
    helpBoards: [HelpBoard]
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

  type HelpBoard {
    _id: ID!
    title: String!
    description: String!
    date: String!
    status: String!
    createdBy: String!
    completedBy: String
  }

  input HelpBoardInput {
    title: String!
    description: String!
    date: String!
    status: String!
    createdBy: String!
    completedBy: String
  }

  type Query {
    me: User
    charities: [Charity]
    charity(_id: ID!): Charity
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    addCharity(input: CharityInput!): User
    removeCharity(charityId: ID!): User
    addHelpBoard(input: HelpBoardInput!): User
    removeHelpBoard(helpBoardId: ID!): User
  }
`;

export default typeDefs;
