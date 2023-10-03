class Environment {
  static nodeEnv = process.env.NODE_ENV?.toUpperCase?.();

  static isLocal = Environment.nodeEnv === 'LOCAL';
  static isDevelopment = Environment.nodeEnv === 'DEVELOPMENT';
  static isProduction = Environment.nodeEnv === 'PRODUCTION';
  static isNotProduction = Environment.isLocal || Environment.isDevelopment;

  static isDebugMode = process.env.DEBUG?.toUpperCase?.() === 'TRUE';
  static isLoggingDisabled =
    process.env.DISABLE_LOGGER?.toUpperCase?.() === 'TRUE';
}

export default Environment;
