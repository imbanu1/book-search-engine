const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
Query: {
    me: async (parent, args, context) => {
        if (context.user) {
           const userData = await User.findOne({ _id: context.user._id.select("-__v -password").populate("book");
        return userData;
        }
        throw new AuthenticationError("You must be signed in");
        },
        users: async () => {
            return User.find().select("-__v -password").populate("book");
        },
},
},

Mutation: {
login: async (parent, { email, password }) => {
    const user = await User.create({ username, email, password});
    if (!user) {
        throw new AuthenticationError("Invalid password");
    }
    const  correctPw = await.isCorrectPassword(password);
    if (!correctPw) {
        throw new AuthenticationError("Invalid password");
    }
    const token = signToken(user);
    return {token, user};
},

addUser: async (parent, { usetname, email, password }) => {
    const user = await User.create({ username, email, password});
    const token = signToken(user);
    return { token, user };
},

saveBook: async (parent, {bookInput }, context) => {
    if (context.user) {
        const book = await User.findByIdAndUpdate(
            {_id: context.user._id},
            {$push: { savedBooks: bookInput}},
            {new: true}
        );
        return book;
    }
}



}