/* eslint-disable */
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

declare namespace IndexModule {
  import * as Types from "../../types/types/graphql";
  interface DefinedFields {
    Query: ;
    Mutation: ;
    MutationResponse: 'success' | 'message' | 'errors' | 'code';
    ErrorResponse: 'path' | 'message';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type MutationResponse = Pick<Types.MutationResponse, DefinedFields['MutationResponse']>;
  export type ErrorResponse = Pick<Types.ErrorResponse, DefinedFields['ErrorResponse']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type MutationResponseResolvers = Pick<Types.MutationResponseResolvers, DefinedFields['MutationResponse'] | '__isTypeOf'>;
  export type ErrorResponseResolvers = Pick<Types.ErrorResponseResolvers, DefinedFields['ErrorResponse'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    MutationResponse?: MutationResponseResolvers;
    ErrorResponse?: ErrorResponseResolvers;
  };
}