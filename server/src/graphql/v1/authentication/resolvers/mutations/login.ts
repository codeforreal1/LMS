import { z } from 'zod';

import type { MutationResolvers } from '../../types';
import GraphqlLib from '../../../../../libs/Graphql';
import PasswordLib from '../../../../../libs/Password';
import CookieLib from '../../../../../libs/Cookie';
import JWTLib from '../../../../../libs/JWT';
import { db, orm, schema } from '../../../../../db/libs/Database';
import errorCodes from '../../../../../static/error-codes';
import keys from '../../../../../static/keys';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const login: MutationResolvers['login'] = async function (
  _,
  inputs,
  context,
) {
  const [isValid, response] = GraphqlLib.validateInput(inputs, loginSchema);

  if (!isValid) {
    return response;
  }

  const { email, password } = inputs;

  try {
    const [user] = await db
      .select()
      .from(schema.user)
      .innerJoin(
        schema.credential,
        orm.eq(schema.user.id, schema.credential.id),
      )
      .where((user) => orm.eq(user.credential.email, email))
      .limit(1);

    if (user == null) {
      return {
        success: false,
        message: 'Account does not exist.',
        code: errorCodes.ACCOUNT_DOES_NOT_EXIST,
      };
    }

    const doesPasswordMatch = await PasswordLib.compare(
      password,
      user.credential.password as string,
    );

    if (!doesPasswordMatch) {
      return {
        success: false,
        message: 'Email or password do not match.',
        code: errorCodes.CREDENTIALS_DO_NOT_MATCH,
      };
    }

    const tokenPayload = {
      user: {
        id: user.user.id,
        uuid: user.user.uuid,
      },
      credential: {
        id: user.user.id,
        role: user.credential.role,
        session_key: user.credential.sessionKey,
      },
    };

    const accessToken = JWTLib.createAccessToken(tokenPayload);

    // Primary Cookie
    context.res.cookie(
      keys.ACCESS_TOKEN,
      accessToken,
      CookieLib.constructResponseArgs({
        httpOnly: true,
        maxAge: JWTLib.accessTokenExpiresIn,
      }),
    );

    // Secondary Cookie
    context.res.cookie(
      keys.SESSION_KEY,
      user.credential.sessionKey,
      CookieLib.constructResponseArgs({
        httpOnly: false,
        maxAge: JWTLib.accessTokenExpiresIn,
      }),
    );

    return {
      success: true,
      message: 'Login successful.',
      data: user.user,
    };
  } catch (error) {
    return GraphqlLib.catchError(error);
  }
};
