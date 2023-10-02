/* eslint-disable */
// @ts-nocheck
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

import * as Types from "../../types";
interface DefinedFields {
  MutationResponse: 'success' | 'message' | 'errors' | 'code';
  ErrorResponse: 'path' | 'message';
  Response: 'success' | 'message' | 'errors' | 'code';
};

export type Response = Pick<Types.Response, DefinedFields['Response']>;
export type ErrorResponse = Pick<Types.ErrorResponse, DefinedFields['ErrorResponse']>;
export type MutationResponse = Pick<Types.MutationResponse, DefinedFields['MutationResponse']>;

export type MutationResponseResolvers = Pick<Types.MutationResponseResolvers, DefinedFields['MutationResponse'] | '__isTypeOf'>;
export type ErrorResponseResolvers = Pick<Types.ErrorResponseResolvers, DefinedFields['ErrorResponse'] | '__isTypeOf'>;
export type ResponseResolvers = Pick<Types.ResponseResolvers, DefinedFields['Response']>;

export interface Resolvers {
  MutationResponse?: MutationResponseResolvers;
  ErrorResponse?: ErrorResponseResolvers;
};