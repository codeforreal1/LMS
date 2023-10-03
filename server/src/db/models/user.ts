import mysql from 'drizzle-orm/mysql-core';
import orm from 'drizzle-orm';

import { statusColumnEnum } from '../utils';
import { generateAlphanumericUUID } from '../../utils/uuid';
import { credential } from './credential';

export const user = mysql.mysqlTable(
  'user',
  {
    id: mysql.int('id').primaryKey().autoincrement(),

    uuid: mysql
      .varchar('uuid', { length: 36 })
      .notNull()
      .$defaultFn(generateAlphanumericUUID),

    firstName: mysql.varchar('first_name', { length: 255 }),

    lastName: mysql.varchar('last_name', { length: 255 }),

    registeredAt: mysql.datetime('registered_at'),

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

    credentialId: mysql.int('credential_id').notNull(),
  },
  (table) => ({
    credentialIdIdx: mysql.index('credential_id_idx').on(table.credentialId),
  }),
);

export const userRelations = orm.relations(user, ({ one }) => ({
  credential: one(credential, {
    fields: [user.credentialId],
    references: [credential.id],
  }),
}));
