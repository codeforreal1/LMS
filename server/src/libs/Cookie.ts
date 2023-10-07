import type { CookieOptions } from 'express';

import Environment from './Environment';

class Cookie {
  static constructCookieOptions(args: Partial<CookieOptions>): CookieOptions {
    return {
      ...(Environment.isHTTPS ? { sameSite: 'none', secure: true } : {}),
      ...args,
    };
  }
}

export default Cookie;
