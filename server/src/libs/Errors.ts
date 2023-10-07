import util from 'util';

import Logger from './Logger';
import Environment from './Environment';
import errorCodes from '../static/error-codes';

const logger = new Logger(__filename);

interface DefaultOptions {
  catchException: {
    meta?: Record<string, unknown>;
    disableLogging?: boolean;
  };
}

const defaultOptions: DefaultOptions = {
  catchException: {
    disableLogging: false,
    meta: {},
  },
};

class Errors {
  static catchException(
    error: unknown,
    options?: DefaultOptions['catchException'],
  ) {
    options = { ...defaultOptions.catchException, ...options };

    if (Environment.isDebugMode) {
      util.inspect.defaultOptions.showHidden = true;
      console.log('\x1b[31m%s\x1b[0m', '> Error', { error });
    }

    if (!options.disableLogging && !Environment.isLoggingDisabled) {
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

export default Errors;
