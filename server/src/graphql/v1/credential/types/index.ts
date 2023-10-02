/* eslint-disable */
// @ts-nocheck
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

import * as Types from "../../types";
interface DefinedFields {
  Credential: 'id' | 'uuid' | 'email';
};

export type Credential = Pick<Types.Credential, DefinedFields['Credential']>;

export type CredentialResolvers = Pick<Types.CredentialResolvers, DefinedFields['Credential'] | '__isTypeOf'>;

export interface Resolvers {
  Credential?: CredentialResolvers;
};