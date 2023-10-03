import 'dotenv/config';
import orm from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql, { ConnectionOptions } from 'mysql2/promise';

import * as schema from '../models';

export const config: ConnectionOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
};

const connection = mysql.createPool(config);

const db = drizzle(connection, {
  logger: process.env.DEBUG === 'true',
  schema,
  mode: 'planetscale',
});

interface DatabaseInterface {
  name: string;
}

class Database implements DatabaseInterface {
  name = 'Drizzle';
  static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (Database.instance == null) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export const instance = Database.getInstance();

export { db, orm, schema };
export default Database;
