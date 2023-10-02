/* eslint-disable */
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

declare namespace AuthenticationModule {
  import * as Types from "../../types/types/graphql";
  interface DefinedFields {
    Mutation: 'register';
  };
  
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type MutationResponse = Types.MutationResponse;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
  };
}