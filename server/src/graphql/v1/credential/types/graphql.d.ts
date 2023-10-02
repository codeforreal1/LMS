/* eslint-disable */
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

declare namespace CredentialModule {
  import * as Types from "../../types/types/graphql";
  interface DefinedFields {
    Credential: 'id' | 'uuid' | 'email';
  };
  
  export type Credential = Pick<Types.Credential, DefinedFields['Credential']>;
  
  export type CredentialResolvers = Pick<Types.CredentialResolvers, DefinedFields['Credential'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Credential?: CredentialResolvers;
  };
}