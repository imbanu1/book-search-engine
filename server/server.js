const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express'); 
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');




async function startApolloServer(typeDefs, resolvers) {

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(cors());
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
    
    const authData = authMiddleware({ req });
 
    return{...authData };
    },
    // introspection: true,
  });

  
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());


  server.applyMiddleware({ app, path: '/graphql' });


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }


  db.once('open', () => {
    app.listen(PORT, () => 
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
  });
}


startApolloServer(typeDefs, resolvers);
