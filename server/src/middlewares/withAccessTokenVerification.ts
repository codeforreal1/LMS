import type { Request, Response, NextFunction } from 'express';

import AuthenticationLib from '../libs/Authentication';
import errorCodes from '../constants/error-codes';
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
      const req = request as Request;
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

      res.locals.middlewares = {
        ...(res.locals.middleware ?? {}),
        withAccessTokenVerification: accessTokenPayload,
      };

      return next();
    } catch (error) {
      console.log('Authentication Error', error);
      res.status(401).json({
        success: false,
        message: 'Authentication error.',
        code: errorCodes.INVALID_TOKEN,
      });
    }
  };
}
