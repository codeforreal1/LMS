import type { Redis as RedisClient } from 'ioredis';
import IORedis from 'ioredis';

const REDIS_USERNAME = process.env.REDIS_USERNAME ?? '';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? '';
const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';
const REDIS_PORT = +((process.env.REDIS_PORT as string) ?? 6379);

class Redis {
  static instance: RedisClient;

  static uri = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;

  private constructor() {}

  static getInstance() {
    if (Redis.instance == null) {
      return new IORedis({
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD,
        port: REDIS_PORT,
        host: REDIS_HOST,
      });
    }

    return Redis.instance;
  }
}

export default Redis;
