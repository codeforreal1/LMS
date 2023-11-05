import type { Request } from 'express';
import { z } from 'zod';

import EncryptionLib from './Encryption';
import JWTLib from './JWT';
import { roleColumnEnum } from '../db/utils/enums';
import keys from '../constants/keys';

type TokenUnion = Extract<
  keyof typeof keys,
  'ACCESS_TOKEN' | 'REFRESH_TOKEN' | 'SESSION_KEY'
>;

type TokenEntries = Partial<Record<TokenUnion, string>>;

const TokenEntriesList: TokenUnion[] = [
  keys.ACCESS_TOKEN,
  keys.REFRESH_TOKEN,
  keys.SESSION_KEY,
];

const accessTokenPayloadSchema = z.object({
  user: z.object({
    id: z.number(),
    uuid: z.string(),
  }),
  credential: z.object({
    id: z.number(),
    role: z.enum(roleColumnEnum),
    session_key: z.string(),
  }),
});

const sessionKeyPayloadSchema = z.string();

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
export type SessionKeyPayload = z.infer<typeof sessionKeyPayloadSchema>;

class Authentication {
  static findTokensEntries(req: Request): TokenEntries {
    const tokens: TokenEntries = {};

    // Check cookies first(Only applies to client to server calls.)
    const cookies = req.cookies;
    TokenEntriesList.forEach((key) => {
      if (key in cookies) {
        tokens[key] = cookies[key];
      }
    });

    if (Object.keys(tokens).length > 0) {
      return tokens;
    }

    // Checks headers with encrypted nonce(Only applies to server to server calls.)
    const xCookiesString = req.headers['x-cookies'] as string;
    if (xCookiesString == null) {
      return {};
    }
    try {
      const xCookies: TokenEntries = JSON.parse(xCookiesString);
      if (typeof xCookies !== 'object') {
        throw new Error('Invalid request.');
      }
      const encryptedNonce = req.headers['x-nonce'] as string;
      if (encryptedNonce == null) {
        throw new Error('Invalid request.');
      }

      const nonce = EncryptionLib.decrypt(encryptedNonce);
      const isNonceValid = !isNaN(+nonce);
      if (!isNonceValid) {
        throw new Error('Invalid request.');
      }
      if (+new Date() - +nonce >= 3 * 60 * 1000) {
        throw new Error('Request Timeout.');
      }

      TokenEntriesList.forEach((key) => {
        if (key in xCookies) {
          tokens[key] = xCookies[key];
        }
      });
      return tokens;
    } catch (error) {
      // Someone tried to tamper the headers.
    }

    return {};
  }

  static parseAccessTokenPayload(
    accessToken: string,
  ): AccessTokenPayload | null {
    const tokenPayload = JWTLib.verifyAccessToken(accessToken);
    const validation = accessTokenPayloadSchema.safeParse(tokenPayload);
    if (!validation.success) {
      return null;
    }
    return validation.data;
  }

  static parseSessionKeyPayload(sessionKey: string): SessionKeyPayload | null {
    const validation = sessionKeyPayloadSchema.safeParse(sessionKey);
    if (!validation.success) {
      return null;
    }
    return validation.data;
  }
}

export default Authentication;
