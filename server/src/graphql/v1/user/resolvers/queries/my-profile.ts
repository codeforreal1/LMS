import type { QueryResolvers } from '../../types';
import ErrorsLib from '../../../../../libs/Errors';
import { db, orm, schema } from '../../../../../db/libs/Database';
import errorCodes from '../../../../../constants/error-codes';

export const myProfile: QueryResolvers['myProfile'] = async function () {
  try {
    const [user] = await db
      .select()
      .from(schema.user)
      .innerJoin(
        schema.credential,
        orm.eq(schema.user.id, schema.credential.id),
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
    return ErrorsLib.catchException(error);
  }
};
