import 'dotenv/config';
import jwt from 'jsonwebtoken';

import Encryption from './Encryption';

interface DefaultOptions {
  createAccessToken: {
    expiresIn: number;
  };

  createRefreshToken: {
    expiresIn: number;
  };
}

interface PayloadToSign {
  __token__: string;
}

const accessTokenExpiresIn = +(process.env.JWT_EXPIRY_IN_MILLISECONDS ?? 1);
const refreshTokenExpiresIn = +(
  process.env.JWT_REFRESH_TOKEN_EXPIRY_IN_MILLISECONDS ?? 1
);

const defaultOptions: DefaultOptions = {
  createAccessToken: {
    expiresIn: +(process.env.JWT_EXPIRY_IN_MILLISECONDS ?? 1),
  },
  createRefreshToken: {
    expiresIn: +(process.env.JWT_REFRESH_TOKEN_EXPIRY_IN_MILLISECONDS ?? 1),
  },
};

const jwtSecret = process.env.JWT_SECRET_KEY as string;

class JWT {
  static accessTokenExpiresIn = accessTokenExpiresIn;
  static refreshTokenExpiresIn = refreshTokenExpiresIn;

  static createAccessToken(
    payload: object,
    options = defaultOptions.createAccessToken,
  ) {
    options = { ...defaultOptions.createAccessToken, ...options };

    const payloadToSign: PayloadToSign = {
      __token__: JSON.stringify(payload),
    };

    const signed = jwt.sign(payloadToSign, jwtSecret, {
      expiresIn: options.expiresIn / 1000,
      algorithm: 'HS256',
    });

    return Encryption.encrypt(signed);
  }

  static createRefreshToken(
    payload: object,
    accessToken: string,
    options = defaultOptions.createRefreshToken,
  ) {
    options = { ...defaultOptions.createRefreshToken, ...options };

    const encryptedAccessToken = Encryption.encrypt(accessToken);

    const payloadToSign: PayloadToSign = {
      __token__: JSON.stringify({
        ...payload,
        access_token: encryptedAccessToken,
      }),
    };
    const signed = jwt.sign(payloadToSign, jwtSecret, {
      expiresIn: +options.expiresIn / 1000,
      algorithm: 'HS256',
    });

    return Encryption.encrypt(signed);
  }

  static verifyAccessToken(token: string) {
    try {
      const decryptedToken = Encryption.decrypt(token);
      const payload = jwt.verify(decryptedToken, jwtSecret) as PayloadToSign;
      if (payload == null || payload?.__token__ == null) {
        throw new Error();
      }
      const parsedData = JSON.parse(payload.__token__);
      if ('access_token' in parsedData) {
        throw new Error();
      }
      return parsedData;
    } catch (_) {
      return null;
    }
  }

  static verifyRefreshToken(token: string) {
    try {
      const decryptedToken = Encryption.decrypt(token);
      const payload = jwt.verify(decryptedToken, jwtSecret) as PayloadToSign;
      if (payload == null || payload?.__token__ == null) {
        throw new Error();
      }
      const parsedData = JSON.parse(payload.__token__);
      const accessToken = parsedData?.access_token;
      if (!accessToken) {
        throw new Error();
      }

      return [parsedData, accessToken];
    } catch (_) {
      return null;
    }
  }
}

export default JWT;
