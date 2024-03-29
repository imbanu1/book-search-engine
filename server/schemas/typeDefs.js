const { gql } =require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    type User {
        _id: ID
        username: String
        email: String
        bookCount: int
        SavedBooks: [Book]
    }
    type Book {
        bookId: ID
        authors: [string]
        description: String
        title: String
        image: String
        link: String
    }
    type Auth {
        token: ID
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!) Auth
        saveBook (): User
        removeBook(): User
    }
}