import { z } from 'zod';

import type { MutationResolvers } from '../../types';
import GraphqlLib from '../../../../../libs/Graphql';
import Database, { client as dbClient } from '../../../../../libs/Database';
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
    const existingUser = await dbClient.credential.findFirst({
      where: { email: email.trim() },
    });

    if (!(existingUser == null)) {
      return {
        success: false,
        message: 'Account with same email already exists.',
        code: errorCodes.EMAIL_ALREADY_EXISTS,
      };
    }

    const hashedPassword = await PasswordLib.hash(password);

    const { user } = await dbClient.$transaction(async function (tx) {
      const credential = await tx.credential.create({
        data: {
          uuid: Database.generateUUID(),
          email,
          password: hashedPassword,
        },
      });

      const user = await tx.user.create({
        data: {
          uuid: Database.generateUUID(),
          credentialId: credential.id,
          registeredAt: new Date(),
        },
      });

      return { user, credential };
    });

    return {
      success: true,
      message: 'Account created successfully.',
      data: {
        id: Number(user.id),
        uuid: user.uuid,
      },
    };
  } catch (error) {
    console.log('---', error);
    return {
      success: false,
    };
  }
};

export default register;
