/* eslint-disable */
// @ts-nocheck
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

import * as Types from "../../types";
interface DefinedFields {
  Query: '_query_';
  Mutation: '_mutation_';
  MutationResponse: 'success' | 'message' | 'errors' | 'code';
  ErrorResponse: 'path' | 'message';
  Response: 'success' | 'message' | 'errors' | 'code';
};

export type Query = Pick<Types.Query, DefinedFields['Query']>;
export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
export type Response = Pick<Types.Response, DefinedFields['Response']>;
export type ErrorResponse = Pick<Types.ErrorResponse, DefinedFields['ErrorResponse']>;
export type MutationResponse = Pick<Types.MutationResponse, DefinedFields['MutationResponse']>;

export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
export type MutationResponseResolvers = Pick<Types.MutationResponseResolvers, DefinedFields['MutationResponse'] | '__isTypeOf'>;
export type ErrorResponseResolvers = Pick<Types.ErrorResponseResolvers, DefinedFields['ErrorResponse'] | '__isTypeOf'>;
export type ResponseResolvers = Pick<Types.ResponseResolvers, DefinedFields['Response']>;

export interface Resolvers {
  Query?: QueryResolvers;
  Mutation?: MutationResolvers;
  MutationResponse?: MutationResponseResolvers;
  ErrorResponse?: ErrorResponseResolvers;
};