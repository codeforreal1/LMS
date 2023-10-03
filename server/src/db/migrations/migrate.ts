import util from 'util';
import path from 'path';
import { migrate } from 'drizzle-orm/mysql2/migrator';

import { db } from '../libs/Database';

(async function () {
  try {
    await migrate(db, {
      migrationsFolder: path.join(__dirname, '..', '..', '..', '.drizzle'),
    });
    console.log('\x1b[32m%s\x1b[0m', 'Migration succeeded.');
    process.exit(0);
  } catch (error) {
    util.inspect.defaultOptions.showHidden = true;
    console.log('\x1b[31m%s\x1b[0m', 'Migration failed.', error);
    process.exit(1);
  }
})();
