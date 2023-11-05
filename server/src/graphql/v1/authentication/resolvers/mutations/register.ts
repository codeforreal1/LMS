import { z } from 'zod';

import type { MutationResolvers } from '../../types';
import ErrorsLib from '../../../../../libs/Errors';
import ValidationLib from '../../../../../libs/Validation';
import { db, orm, schema, enums } from '../../../../../db/libs/Database';
import PasswordLib from '../../../../../libs/Password';
import errorCodes from '../../../../../constants/error-codes';

const registerSchema = z.object({
  email: z.string().email('Email must be a valid one.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export const register: MutationResolvers['register'] = async function (
  _,
  inputs,
) {
  const [isValid, response] = ValidationLib.validateSchema(
    inputs,
    registerSchema,
  );

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
        role: enums.role.USER,
      });

      const user = await tx.insert(schema.user).values({
        credentialId: credential[0].insertId,
        registeredAt: new Date(),
      });

      return { userId: user[0].insertId, credentialId: credential[0].insertId };
    });

    return {
      success: true,
      message: 'Account created successfully.',
    };
  } catch (error) {
    return ErrorsLib.catchException(error);
  }
};
