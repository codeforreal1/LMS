import type { ZodSchema } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import util from 'util';

import type { VerifyAccessTokenDirectiveV1 } from '../graphql/v1/index/directives/verifyAccessToken';
import Logger from './Logger';
import Environment from './Environment';
import errorCodes from '../static/error-codes';

const logger = new Logger(__filename);

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

interface DefaultOptions {
  catchError: {
    meta: Record<string, unknown>;
  };
}

interface ErrorResponse {
  path: string;
  message: string;
}

interface GraphqlResponse {
  success: boolean;
  code?: string;
  message?: string;
  errors?: ErrorResponse[];
}

const defaultOptions: DefaultOptions = {
  catchError: {
    meta: {},
  },
};

export interface GraphqlContextV1 {
  req: Request;
  res: Response;
  directives?: {
    verifyAccessToken?: VerifyAccessTokenDirectiveV1;
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

  static validateInput<T>(
    inputs: T,
    validationSchema: ZodSchema,
  ): [true, T] | [false, GraphqlResponse] {
    const validation = validationSchema.safeParse(inputs);
    if (!validation.success) {
      const errors = validation.error.issues?.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));
      return [
        false,
        {
          success: false,
          message: 'Input validation failed.',
          code: errorCodes.ERROR_INPUT_VALIDATION,
          errors,
        },
      ];
    }
    return [true, inputs];
  }

  static catchError(error: unknown, options?: DefaultOptions['catchError']) {
    options = { ...defaultOptions.catchError, ...options };

    if (Environment.isDebugMode) {
      util.inspect.defaultOptions.showHidden = true;
      console.log('\x1b[31m%s\x1b[0m', '> Error', { error });
    }

    if (!Environment.isLoggingDisabled) {
      const message = error instanceof Error ? error.message : '-';
      logger.log.error(
        new Error(JSON.stringify({ prompt: message, meta: options.meta })),
      );
    }

    return {
      success: false,
      message: 'Something went wrong',
      code: errorCodes.ERROR_UNKNOWN,
    };
  }
}

export default Graphql;
