import gql from 'graphql-tag';

const typeDefs = gql`
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

  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    me: User
    posts: [Post]!
    post(id: ID!): Post
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    createPost(title: String!, description: String!, payment: String!): Post
    completePost(postId: ID!): Post
  }
`;

export default typeDefs;
