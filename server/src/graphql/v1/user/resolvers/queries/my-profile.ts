import type { QueryResolvers } from '../../types';
import GraphqlLib from '../../../../../libs/Graphql';
import { db, orm, schema } from '../../../../../db/libs/Database';
import errorCodes from '../../../../../static/error-codes';

export const myProfile: QueryResolvers['myProfile'] = async function (
  _,
  _2,
  { directives },
) {
  const { user } = directives?.verifyAccessToken ?? {};

  console.log(user);

  try {
    const [user] = await db
      .select()
      .from(schema.user)
      .innerJoin(
        schema.credential,
        orm.eq(schema.user.id, schema.credential.id),
      )
      // .where((user) =>
      //   IsUUID ? orm.eq(user.user.uuid, id) : orm.eq(user.user.id, +id),
      // )
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
