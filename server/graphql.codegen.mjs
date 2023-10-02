/** @type {import("@graphql-codegen/cli").CodegenConfig} */

const config = {
  overwrite: true,
  generates: {
    './src/graphql/v1': {
      schema: './src/graphql/v1/**/typeDefs/index.ts',
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

export default config;
