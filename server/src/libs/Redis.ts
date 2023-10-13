console.log(process.env.REDIS_USERNAME);

const REDIS_USERNAME = process.env.REDIS_USERNAME ?? '';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? '';
const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';
const REDIS_PORT = process.env.REDIS_PORT ?? 6379;

class Redis {
  static uri = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;
}

export default Redis;
