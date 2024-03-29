const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

Query: {
    me: async (parent, args, context) => {
        if (context.user) {
           const userData = await User.findOne({ _id: context.user._id.select("-__v -password");
        return data;
        }
        throw new AuthenticationError("You must be signed in");
        },
        users: async ( => {
            return User.find().select("-__v -password").populate("book");
        })
    }
}