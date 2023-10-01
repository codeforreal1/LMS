require('dotenv').config();

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

import typeDefsV1 from './graphql/v1/typeDefs';
import resolversV1 from './graphql/v1/resolvers';
import GraphqlLib from './libs/Graphql';

const app = express();
const graphqlLib = new GraphqlLib();

app.use(cors());
app.use(express.json());

const apolloServerV1 = new ApolloServer({
  typeDefs: typeDefsV1,
  resolvers: resolversV1,
});

const PORT = process.env.PORT;
(async function () {
  await apolloServerV1.start();
  app.use(
    GraphqlLib.graphqlPathV1,
    cors(),
    express.json(),
    expressMiddleware(apolloServerV1),
  );
  app.use(graphqlLib.graphqlLoggerMiddleware);
  GraphqlLib.availableVersions.forEach((graphql) => {
    console.log(
      '\x1b[35m%s\x1b[0m',
      `GraphQL Version ${graphql?.id} running at http://localhost:${PORT}${graphql?.path}`,
    );
  });
  app.listen(PORT, function () {
    console.log('\x1b[32m%s\x1b[0m', `Server started at port ${PORT}.`);
  });
})();
