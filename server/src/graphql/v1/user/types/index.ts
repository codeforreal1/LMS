/* eslint-disable */
// @ts-nocheck
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

import * as Types from "../../types";
interface DefinedFields {
  Query: 'getUser';
  User: 'id' | 'uuid' | 'firstName' | 'lastName' | 'credential';
};

export type Query = Pick<Types.Query, DefinedFields['Query']>;
export type User = Pick<Types.User, DefinedFields['User']>;
export type Credential = Types.Credential;

export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;

export interface Resolvers {
  Query?: QueryResolvers;
  User?: UserResolvers;
};