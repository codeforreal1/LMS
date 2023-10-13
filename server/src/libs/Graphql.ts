import type { Request, Response, NextFunction } from 'express';

import type { WithAccessTokenVerificationDirective as WithAccessTokenVerificationDirectiveV1 } from '../graphql/v1/index/directives/withAccessTokenVerification';
import Environment from './Environment';

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

export interface GraphqlContextV1 {
  req: Request;
  res: Response;
  directives?: {
    withAccessTokenVerification?: WithAccessTokenVerificationDirectiveV1;
    withCacheControl?: unknown; // for now
  };
}

class Graphql {
  version?: number;

  static availableVersions = AVAILABLE_VERSIONS;

  constructor(version?: number) {
    if (!(version == null)) {
      this.version = version;
    }
  }

  getPath() {
    if (this.version == null) {
      throw new Error('version must be supplied to get the graphql path.');
    }
    return findPath(this.version);
  }

  async setContext({ req, res }: { req: Request; res: Response }) {
    return {
      req,
      res,
    };
  }

  withLogMiddleware(version?: number) {
    return function (req: Request, _: Response, next: NextFunction) {
      if (Environment.isDebugMode) {
        const disallowedLogs = ['IntrospectionQuery'];

        if (
          req.method === 'POST' &&
          Graphql.availableVersions
            .map((version) => version?.path)
            .includes(req.originalUrl)
        ) {
          const { query, variables, operationName } = req.body;
          !disallowedLogs.includes(operationName) &&
            console.log(
              [
                '\n',
                `Graphql${version ? `@v${version}` : ''}`,
                `Operation Name: ${operationName}`,
                `Operation: ${query}`,
                `Variables: ${JSON.stringify(variables)}`,
                '\n',
              ].join('\n'),
            );
        }
        next();
      }
    };
  }
}

export default Graphql;
