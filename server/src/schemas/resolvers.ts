import { User, Charity, HelpBoard, Event } from "../models/index.js";
import { AuthenticationError, signToken } from "../utils/auth.js";

import fetch from 'node-fetch';

interface Event {
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventImage: string;
}


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

interface AddEvent {
  input: {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    eventImage: string;
  };
}
interface Charity {
  _id: string;
  name: string;
  description: string;
  image: string;
  website: string;
  locationAddress: string;
  nonprofitTags: string[];
}

interface HelpBoard {
  _id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  createdBy: string;
  completedBy: string;
}

const resolvers = {
  Query: {
    me: async (_: unknown, _args: unknown, context: Context): Promise<User | null> => {
      
      if (!context.user) throw new AuthenticationError('Could not find user');

      return User.findOne({ _id: context.user._id });
    },
    searchCharities: async (_: unknown, _args: {city: String, cause: String}, _context: Context): Promise<Array<Charity> | null> => {
      const {REACT_APP_EVERY_API_KEY} = process.env;
      const response = await fetch(`https://partners.every.org/v0.2/search/${_args.city}?causes=${_args.cause}&apiKey=${REACT_APP_EVERY_API_KEY}`);
      const json = await response.json();
      const data = await json

      return data.nonprofits.map((obj: any) => ({
        _id: obj.ein,
        name: obj.name,
        description: obj.description,
        image: obj.logoUrl,
        website: obj.websiteUrl,
        locationAddress: obj.location,
        nonprofitTags: obj.tags,
      }))
    },
    findUserCharities: async (_: unknown, __: unknown, context: Context): Promise<Array<Charity> | null> => {

      if (!context.user) throw new AuthenticationError('Not Authorized');
      // if (context.user._id !== userId) throw new AuthenticationError('Not Authorized');

      const user = await User.findOne({ _id: context.user._id }).populate('charities');
      return user ? user.charities : null;
    },

    findAllHelpBoards: async (_: unknown, __: unknown, context: Context): Promise<Array<HelpBoard> | null> => {
      if (!context.user) throw new AuthenticationError("Not Authorized");
      const user = await User.findOne({ _id: context.user._id }).populate('helpBoards');
      return user ? (user.helpBoards as unknown as HelpBoard[]) : null;
    
    },
    
    
  },

  Mutation: {
    login: async (
      _: unknown,
      { username, password }: { username: string; password: string }
    ): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ username });
      if (!user) throw AuthenticationError;

      const isCorrectPassword = await user.isCorrectPassword(password);
      if (!isCorrectPassword) throw new AuthenticationError("Not Authorized");

      const token = signToken(user.username, user.email, user.id);
      return { token, user };
    },

    addUser: async (
      _: unknown,
      { input }: AddUser
    ): Promise<{ token: string; user: User }> => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },

    addCharity: async (_: unknown, { input }: { input: Charity }, context: Context): Promise<User | null> => {
      if (!context.user) throw new AuthenticationError('Not Authorized');
      return await User.findOneAndUpdate({ _id: context.user._id }, { $push: { charities: input } }, { new: true }).populate('charities');
    },

    removeCharity: async (_: unknown, { charityId }: { charityId: string }, context: Context): Promise<User | null> => {
      if (!context.user) throw new AuthenticationError('Not Authorized');
      return await
        User.findOneAndUpdate({ _id: context.user._id }, { $pull: { charities: { _id: charityId } } }, { new: true });
    },

    addEvent: async (_: unknown, { input }: AddEvent, context: Context): Promise<Event | null> => {
      if (!context.user) throw new AuthenticationError('Not Authorized');

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { charities: input } },
        { new: true }
      );

      return updatedUser ? input : null;
    },

  

    addHelpBoard: async (
      _: unknown,
      { input }: { input: HelpBoard },
      context: Context
    ): Promise<User | null> => {
      if (!context.user) throw new AuthenticationError("Not Authorized");
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { helpBoards: input } },
        { new: true }
      );
    },

    removeHelpBoard: async (
      _: unknown,
      { helpBoardId }: { helpBoardId: string },
      context: Context
    ): Promise<User | null> => {
      if (!context.user) throw new AuthenticationError("Not Authorized");
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { helpBoards: { _id: helpBoardId } } },
        { new: true }
      );
    },


    deleteEvent: async (_: unknown, { eventId }: { eventId: string }, context: Context): Promise<Event | null> => {
      if (!context.user) throw new AuthenticationError('Not Authorized');

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { events: { _id: eventId } } },
        { new: true }
      );

      return updatedUser ? null : null;
    },
  },
};

export default resolvers;
