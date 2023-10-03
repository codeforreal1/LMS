import mysql from 'drizzle-orm/mysql-core';
import orm from 'drizzle-orm';

import { statusColumnEnum } from '../utils';
import { generateAlphanumericUUID } from '../../utils/uuid';

export const credential = mysql.mysqlTable('credential', {
  id: mysql.int('id').primaryKey().autoincrement(),

  uuid: mysql
    .varchar('uuid', { length: 36 })
    .notNull()
    .$defaultFn(generateAlphanumericUUID),

  email: mysql.varchar('email', { length: 255 }),
  password: mysql.varchar('password', { length: 255 }),

  createdAt: mysql
    .datetime('created_at')
    .notNull()
    .default(orm.sql`CURRENT_TIMESTAMP`),

  updatedAt: mysql
    .datetime('updated_at')
    .notNull()
    .default(orm.sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),

  status: mysql.mysqlEnum('status', statusColumnEnum).default('ACTIVE'),
  deletedAt: mysql.datetime('deleted_at'),
});
