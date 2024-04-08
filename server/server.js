const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');


async function startApolloServer(typeDefs, resolvers) {
  const app = express();
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: async ({ req }) => {
    const authData = authMiddleware({ req });
    return{...authData };
  },
});
  await server.start();

  app.use(express.urlencoded({extended:false}));
  app.use(express.json());

server.applyMiddleware({ app, path: "/graphql"});

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  db.once("open", () => {
    app.listen(PORT, () => 
      console.log(`API server running on port ${PORT}`),
      console.log(`Use graphql at http://localhost:${PORT}/graphql`)
    );
  });
}

startApolloServer(typeDefs, resolvers);