/* eslint-disable */
// @ts-nocheck
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

import * as Types from "../../types";
interface DefinedFields {
  Mutation: 'register';
  RegisterResponse: 'success' | 'data' | 'message' | 'errors' | 'code';
};

export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
export type RegisterResponse = Pick<Types.RegisterResponse, DefinedFields['RegisterResponse']>;
export type User = Types.User;
export type ErrorResponse = Types.ErrorResponse;
export type Response = Types.Response;

export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
export type RegisterResponseResolvers = Pick<Types.RegisterResponseResolvers, DefinedFields['RegisterResponse'] | '__isTypeOf'>;

export interface Resolvers {
  Mutation?: MutationResolvers;
  RegisterResponse?: RegisterResponseResolvers;
};