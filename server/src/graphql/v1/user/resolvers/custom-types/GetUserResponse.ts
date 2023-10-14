// import { z } from 'zod';

import type { GetUserResponseResolvers } from '../../types';
// import ErrorsLib from '../../../../../libs/Errors';
// import ValidationLib from '../../../../../libs/Validation';
// import { db, orm, schema } from '../../../../../db/libs/Database';
// import errorCodes from '../../../../../static/error-codes';

export const GetUserResponse: GetUserResponseResolvers = {
  data: function (parent) {
    return parent?.data ?? null;
  },
};
