require('dotenv').config();
const { config: connectionConfig } = require('./src/db/libs/Database');

/** @type {import("drizzle-kit").Config} */
const config = {
  driver: 'mysql2',
  schema: './src/db/models/index.ts',
  out: './.drizzle',
  verbose: true,
  strict: true,
  ...(process.env.NODE_ENV === 'LOCAL'
    ? { dbCredentials: connectionConfig }
    : {}),
};

module.exports = config;
