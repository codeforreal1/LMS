import morgan from 'morgan';
import type { ZodSchema } from 'zod';
import { Request } from 'express';
import util from 'util';

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
  formatError: {
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
  formatError: {
    meta: {},
  },
};

class GraphqlLib {
  static availableVersions = AVAILABLE_VERSIONS;

  static graphqlPathV1 = findPath(1);

  static validateInput<T>(
    validationSchema: ZodSchema,
    inputs: T,
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

  graphqlLoggerMiddleware() {
    if (Environment.isDebugMode) {
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

  static formatError(error: unknown, options?: DefaultOptions['formatError']) {
    options = { ...defaultOptions.formatError, ...options };

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

export default GraphqlLib;
