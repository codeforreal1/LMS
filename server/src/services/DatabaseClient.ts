import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({
  log: process.env.DEBUG === 'true' ? ['query', 'info', 'warn', 'error'] : [],
  errorFormat: 'pretty',
});

interface DatabaseClientInterface {
  name: string;
}

class DatabaseClient implements DatabaseClientInterface {
  name = 'Prisma';
  static instance: DatabaseClient;

  private constructor() {}

  static getInstance(): DatabaseClient {
    if (DatabaseClient.instance == null) {
      DatabaseClient.instance = new DatabaseClient();
    }

    return DatabaseClient.instance;
  }
}

const db = DatabaseClient.getInstance();

export { db, client };
