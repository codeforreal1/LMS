/** @type {import("@graphql-codegen/cli").CodegenConfig} */

const config = {
  overwrite: true,
  generates: {
    './src/graphql/v1': {
      schema: './src/graphql/v1/**/typeDefs/index.ts',
      config: {
        // This context type path needs to be relative to the actual generated base types.ts file path(presetConfig.baseTypesPath).
        contextType: '../../libs/Graphql#GraphqlContextV1',
      },
      preset: 'graphql-modules',
      presetConfig: {
        baseTypesPath: 'types.ts',
        filename: 'types/index.ts',
        useGraphQLModules: false,
        noNamespaces: true,
        encapsulateModuleTypes: 'none',
      },
      plugins: [
        {
          add: {
            content:
              '/* eslint-disable */\n// @ts-nocheck\n/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */\n',
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
    },
  },
  require: 'ts-node/register',
};

module.exports = config;
