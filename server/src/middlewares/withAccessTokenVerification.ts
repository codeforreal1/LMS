import type { Request, Response, NextFunction } from 'express';

import AuthenticationLib from '../libs/Authentication';
import errorCodes from '../static/error-codes';
import type { Middlewares } from '.';

export default function withAccessTokenVerification() {
  return function (
    request: Request<
      unknown,
      unknown,
      unknown,
      unknown,
      { middlewares: Middlewares }
    >,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const req = request as Request & { middlewares?: Middlewares };
      const tokens = AuthenticationLib.findTokensEntries(req);
      if (tokens.ACCESS_TOKEN == null) {
        throw new Error();
      }
      const accessTokenPayload = AuthenticationLib.parseAccessTokenPayload(
        tokens?.ACCESS_TOKEN ?? '',
      );

      if (accessTokenPayload == null) {
        throw new Error();
      }

      req.middlewares = {
        ...(req.middlewares ?? {}),
        withAccessTokenVerification: accessTokenPayload,
      };

      return next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Authentication error.',
        code: errorCodes.INVALID_TOKEN,
      });
    }
  };
}
