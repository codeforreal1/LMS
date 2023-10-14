/* eslint-disable */
// @ts-nocheck
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

import * as Types from "../../types";
interface DefinedFields {
  Query: 'myProfile' | 'getUser';
  Mutation: 'updateUser';
  User: 'id' | 'uuid' | 'firstName' | 'lastName' | 'credential';
  GetUserResponse: 'success' | 'data' | 'message' | 'errors' | 'code';
  MyProfileResponse: 'success' | 'data' | 'message' | 'errors' | 'code';
};

export type Query = Pick<Types.Query, DefinedFields['Query']>;
export type MyProfileResponse = Pick<Types.MyProfileResponse, DefinedFields['MyProfileResponse']>;
export type GetUserResponse = Pick<Types.GetUserResponse, DefinedFields['GetUserResponse']>;
export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
export type User = Pick<Types.User, DefinedFields['User']>;
export type Credential = Types.Credential;
export type ErrorResponse = Types.ErrorResponse;
export type Response = Types.Response;

export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
export type GetUserResponseResolvers = Pick<Types.GetUserResponseResolvers, DefinedFields['GetUserResponse'] | '__isTypeOf'>;
export type MyProfileResponseResolvers = Pick<Types.MyProfileResponseResolvers, DefinedFields['MyProfileResponse'] | '__isTypeOf'>;

export interface Resolvers {
  Query?: QueryResolvers;
  Mutation?: MutationResolvers;
  User?: UserResolvers;
  GetUserResponse?: GetUserResponseResolvers;
  MyProfileResponse?: MyProfileResponseResolvers;
};