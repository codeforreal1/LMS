import 'dotenv/config';
import KeyValue from 'keyv';
import KeyvRedis from '@keyv/redis';

import Redis from './Redis';
import Environment from './Environment';

export const keyvRedis = new KeyvRedis(Redis.uri);

function instantiate() {
  const keyv = new KeyValue({
    store: keyvRedis,
    adapter: 'redis',
    namespace: `${Keyv.redisPrefixKey}`, // dynamic namespace is not supported.
  });
  keyv.on('error', function (error) {
    console.error('\x1b[31m%s\x1b[0m', '> Keyv error', error);
  });
  return keyv;
}

class Keyv {
  static redisPrefixKey = `keyv-${Environment.projectName}` as const;
  static instance: ReturnType<typeof instantiate>;

  private constructor() {}

  static getInstance() {
    if (Keyv.instance == null) {
      return instantiate();
    }

    return Keyv.instance;
  }
}

export default Keyv;
