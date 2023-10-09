import 'dotenv/config';
import express from 'express';
import type { Response, NextFunction } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import graphqlSchemaV1 from './graphql/v1';
import type { GraphqlContextV1 } from './libs/Graphql';
import GraphqlLib from './libs/Graphql';
import Environment from './libs/Environment';
import routesV1 from './routes/v1';
import stripeWebhooks from './routes/stripe';

const app = express();
const graphqlLibV1 = new GraphqlLib(1);

const customCors = cors({
  credentials: true,
  origin: function (_, callback) {
    return callback(null, true);
  },
});

app.use(customCors);
app.use(express.json());
app.use(cookieParser());

if (Environment.isHTTPS) {
  app.set('trust proxy', 1);
}

if (Environment.isNotProduction) {
  app.use(function (_, res: Response, next: NextFunction) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    next();
  });
}

routesV1(app);
stripeWebhooks(app);

const PORT = process.env.PORT;

const apolloServerV1 = new ApolloServer<GraphqlContextV1>({
  schema: graphqlSchemaV1,
  includeStacktraceInErrorResponses: Environment.isNotProduction,
  introspection: Environment.isNotProduction,
});

(async function () {
  app.use(graphqlLibV1.withLogMiddleware(graphqlLibV1.version));
  await apolloServerV1.start();
  app.use(
    graphqlLibV1.getPath(),
    expressMiddleware(apolloServerV1, {
      context: graphqlLibV1.setContext,
    }),
  );

  GraphqlLib.availableVersions.forEach((graphql) => {
    graphql.isActive &&
      console.log(
        '\x1b[35m%s\x1b[0m',
        `> GraphQL Version ${graphql?.id} running at http://localhost:${PORT}${graphql?.path}`,
      );
  });
  app.listen(PORT,"0.0.0.0", function () {
    console.log('\x1b[32m%s\x1b[0m', `> Server started at port ${PORT}.`);
  });
})();
