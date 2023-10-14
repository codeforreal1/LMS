class Environment {
  static nodeEnv = process.env.NODE_ENV?.toUpperCase?.();

  static isLocal = Environment.nodeEnv === 'LOCAL';
  static isDevelopment = Environment.nodeEnv === 'DEVELOPMENT';
  static isProduction = Environment.nodeEnv === 'PRODUCTION';
  static isNotProduction = Environment.isLocal || Environment.isDevelopment;

  static isDebugMode = process.env.DEBUG?.toUpperCase?.() === 'TRUE';
  static isLoggingDisabled =
    process.env.DISABLE_LOGGER?.toUpperCase?.() === 'TRUE';

  static isHTTPS = process.env.IS_HTTPS?.toUpperCase?.() === 'TRUE';

  static projectName = process.env.PROJECT_NAME;

  static disableGraphqlCaching =
    process.env.DISABLE_GRAPHQL_CACHING?.toUpperCase() === 'TRUE';
}

export default Environment;
