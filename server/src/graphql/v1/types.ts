/* eslint-disable */
// @ts-nocheck
/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */

import { GraphQLResolveInfo } from 'graphql';
import { GraphqlContextV1 } from '../../libs/Graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Credential = {
  __typename?: 'Credential';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  message?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type GetUserResponse = Response & {
  __typename?: 'GetUserResponse';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<User>;
  errors?: Maybe<Array<ErrorResponse>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type LoginResponse = Response & {
  __typename?: 'LoginResponse';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<User>;
  errors?: Maybe<Array<ErrorResponse>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _mutation_?: Maybe<Scalars['ID']['output']>;
  login: LoginResponse;
  register: MutationResponse;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationResponse = Response & {
  __typename?: 'MutationResponse';
  code?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorResponse>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type MyProfileResponse = Response & {
  __typename?: 'MyProfileResponse';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<User>;
  errors?: Maybe<Array<ErrorResponse>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  _query_?: Maybe<Scalars['ID']['output']>;
  getUser?: Maybe<GetUserResponse>;
  myProfile?: Maybe<MyProfileResponse>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type Response = {
  code?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorResponse>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  credential?: Maybe<Credential>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Response: ( GetUserResponse ) | ( LoginResponse ) | ( MutationResponse ) | ( MyProfileResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Credential: ResolverTypeWrapper<Credential>;
  ErrorResponse: ResolverTypeWrapper<ErrorResponse>;
  GetUserResponse: ResolverTypeWrapper<GetUserResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  MyProfileResponse: ResolverTypeWrapper<MyProfileResponse>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Response']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Credential: Credential;
  ErrorResponse: ErrorResponse;
  GetUserResponse: GetUserResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginResponse: LoginResponse;
  Mutation: {};
  MutationResponse: MutationResponse;
  MyProfileResponse: MyProfileResponse;
  Query: {};
  Response: ResolversInterfaceTypes<ResolversParentTypes>['Response'];
  String: Scalars['String']['output'];
  User: User;
};

export type WithAccessTokenVerificationDirectiveArgs = { };

export type WithAccessTokenVerificationDirectiveResolver<Result, Parent, ContextType = GraphqlContextV1, Args = WithAccessTokenVerificationDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CredentialResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['Credential'] = ResolversParentTypes['Credential']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResponseResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['ErrorResponse'] = ResolversParentTypes['ErrorResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserResponseResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['GetUserResponse'] = ResolversParentTypes['GetUserResponse']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorResponse']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorResponse']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _mutation_?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password'>>;
};

export type MutationResponseResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorResponse']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MyProfileResponseResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['MyProfileResponse'] = ResolversParentTypes['MyProfileResponse']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorResponse']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _query_?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['GetUserResponse']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  myProfile?: Resolver<Maybe<ResolversTypes['MyProfileResponse']>, ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  __resolveType: TypeResolveFn<'GetUserResponse' | 'LoginResponse' | 'MutationResponse' | 'MyProfileResponse', ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorResponse']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphqlContextV1, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  credential?: Resolver<Maybe<ResolversTypes['Credential']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlContextV1> = {
  Credential?: CredentialResolvers<ContextType>;
  ErrorResponse?: ErrorResponseResolvers<ContextType>;
  GetUserResponse?: GetUserResponseResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  MyProfileResponse?: MyProfileResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = GraphqlContextV1> = {
  withAccessTokenVerification?: WithAccessTokenVerificationDirectiveResolver<any, any, ContextType>;
};
