import { z } from 'zod';

import type { QueryResolvers } from '../../types';
import GraphqlLib from '../../../../../libs/Graphql';
import { db, orm, schema } from '../../../../../db/libs/Database';
import errorCodes from '../../../../../static/error-codes';

const getUserSchema = z.object({
  id: z.string().or(
    z.number({
      invalid_type_error: 'id should be either an integer or an uuid',
    }),
  ),
});

export const getUser: QueryResolvers['getUser'] = async function (_, inputs) {
  const [isValid, response] = GraphqlLib.validateInput(inputs, getUserSchema);

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

    return {
      success: true,
      data: {
        id: user.user.id,
        uuid: user.user.uuid,
      },
    };
  } catch (error) {
    return GraphqlLib.catchError(error);
  }
};
