import { PrismaClient } from '@prisma/client';

import { generateAlphanumericUUID } from '../utils/uuid';

const client = new PrismaClient({
  log: process.env.DEBUG === 'true' ? ['query', 'info', 'warn', 'error'] : [],
  errorFormat: 'pretty',
});

interface DatabaseInterface {
  name: string;
}

class Database implements DatabaseInterface {
  name = 'Prisma';
  static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (Database.instance == null) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  static generateUUID() {
    return generateAlphanumericUUID();
  }
}

const db = Database.getInstance();

export { db, client };
export default Database;
