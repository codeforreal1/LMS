/* eslint-disable */
// @ts-nocheck
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

import * as Types from "../../types";
interface DefinedFields {
  Mutation: 'login' | 'register';
  LoginResponse: 'success' | 'data' | 'message' | 'errors' | 'code';
};

export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
export type LoginResponse = Pick<Types.LoginResponse, DefinedFields['LoginResponse']>;
export type MutationResponse = Types.MutationResponse;
export type User = Types.User;
export type ErrorResponse = Types.ErrorResponse;
export type Response = Types.Response;

export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
export type LoginResponseResolvers = Pick<Types.LoginResponseResolvers, DefinedFields['LoginResponse'] | '__isTypeOf'>;

export interface Resolvers {
  Mutation?: MutationResolvers;
  LoginResponse?: LoginResponseResolvers;
};