import { User } from '../models/index.js';
import { AuthenticationError, signToken } from '../utils/auth.js';

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
interface AddUser {
  input: {
    username: string;
    email: string;
    password: string;
  };
}
interface Context {
  user?: User;
}

const resolvers = {
  Query: {
    me: async (_: unknown, _args: unknown, context: Context): Promise<User | null> => {
      if (!context.user) throw new AuthenticationError('Could not find user');

      return await User.findOne({ _id: context.user._id });
    },
  },

  Mutation: {
    login: async (_: unknown, { username, password }: { username: string; password: string }): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ username });
      if (!user) throw AuthenticationError;

      const isCorrectPassword = await user.isCorrectPassword(password);
      if (!isCorrectPassword) throw new AuthenticationError('Not Authorized');

      const token = signToken(user.username, user.email, user.id);
      return { token, user };
    },

    addUser: async (_: unknown, { input }: AddUser): Promise<{ token: string; user: User }> => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },
  },
};

export default resolvers;
