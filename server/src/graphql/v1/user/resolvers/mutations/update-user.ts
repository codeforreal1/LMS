import { z } from 'zod';

import type { MutationResolvers } from '../../types';
import ErrorsLib from '../../../../../libs/Errors';
import ValidationLib from '../../../../../libs/Validation';
import { db, orm, schema } from '../../../../../db/libs/Database';
import errorCodes from '../../../../../static/error-codes';

const updateUserSchema = z.object({
  id: z.string().or(
    z.number({
      invalid_type_error: 'id should be either an integer or an uuid',
    }),
  ),
});

export const updateUser: MutationResolvers['updateUser'] = async function (
  _,
  inputs,
) {
  const [isValid, response] = ValidationLib.validateSchema(
    inputs,
    updateUserSchema,
  );

  if (!isValid) {
    return response;
  }

  const { id } = inputs;
  const IsUUID = isNaN(+id!);

  try {
    const [user] = await db
      .select()
      .from(schema.user)
      .innerJoin(
        schema.credential,
        orm.eq(schema.user.id, schema.credential.id),
      )
      .where((user) =>
        IsUUID ? orm.eq(user.user.uuid, id) : orm.eq(user.user.id, +id),
      )
      .limit(1);

    if (user == null) {
      return {
        success: false,
        message: 'User not found',
        code: errorCodes.USER_NOT_FOUND,
      };
    }

    console.log('--Updated');

    return {
      success: true,
      data: {
        id: user.user.id,
        uuid: user.user.uuid,
        firstName: 'Niraj',
      },
    };
  } catch (error) {
    return ErrorsLib.catchException(error);
  }
};
