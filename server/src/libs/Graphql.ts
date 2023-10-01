import morgan from 'morgan';
import { Request } from 'express';

const AVAILABLE_VERSIONS = [
  {
    id: 1,
    isActive: true,
    path: '/graphql@v1',
  },
];

function findPath(id: number): string {
  return AVAILABLE_VERSIONS.find((version) => version?.id === id)?.path ?? '';
}

class GraphqlLib {
  static availableVersions = AVAILABLE_VERSIONS;

  static graphqlPathV1 = findPath(1);

  graphqlLoggerMiddleware() {
    if (process.env.DEBUG === 'true') {
      morgan.token('graphql-query', (req: Request) => {
        const disallowedLogs = ['IntrospectionQuery'];

        if (
          req.method === 'POST' &&
          GraphqlLib.availableVersions
            .map((version) => version?.path)
            .includes(req.originalUrl)
        ) {
          const { query, variables, operationName } = req.body;
          return !disallowedLogs.includes(operationName)
            ? `GRAPHQL: \nOperation Name: ${operationName} \nQuery: ${query} \nVariables: ${JSON.stringify(
                variables,
              )}`
            : '';
        }
        return '';
      });
      return morgan(':graphql-query');
    }
  }
}

export default GraphqlLib;
