import { z } from 'zod';

import type { MutationResolvers } from '../../types';
import GraphqlLib from '../../../../../libs/Graphql';
import { db, orm, schema } from '../../../../../db/libs/Database';
import PasswordLib from '../../../../../libs/Password';
import errorCodes from '../../../../../static/error-codes';

type RegisterMutations = MutationResolvers['register'];

const registerSchema = z.object({
  email: z.string().email('Email must be a valid one.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

const register: RegisterMutations = async function (_, inputs) {
  const [isValid, response] = GraphqlLib.validateInput(registerSchema, inputs);

  if (!isValid) {
    return response;
  }
  const { email, password } = response;

  try {
    const existingUser = await db.query.credential.findFirst({
      where: (credential) => orm.eq(credential.email, email),
    });

    if (!(existingUser == null)) {
      return {
        success: false,
        message: 'Account with same email already exists.',
        code: errorCodes.EMAIL_ALREADY_EXISTS,
      };
    }

    const hashedPassword = await PasswordLib.hash(password);

    await db.transaction(async (tx) => {
      const credential = await tx.insert(schema.credential).values({
        email,
        password: hashedPassword,
      });

      const user = await tx.insert(schema.user).values({
        credentialId: credential[0].insertId,
        // credentialId: 10,
        registeredAt: new Date(),
      });

      return { userId: user[0].insertId, credentialId: credential[0].insertId };
    });

    return {
      success: true,
      message: 'Account created successfully.',
    };
  } catch (error) {
    console.log('---', error);
    return {
      success: false,
    };
  }
};

export default register;
