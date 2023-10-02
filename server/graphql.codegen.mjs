/** @type {import("@graphql-codegen/cli").CodegenConfig} */

const config = {
  overwrite: true,
  generates: {
    './src/graphql/v1': {
      schema: './src/graphql/v1/**/typeDefs/index.ts',
      preset: 'graphql-modules',
      presetConfig: {
        useGraphQLModules: false,
        baseTypesPath: 'types/graphql.d.ts',
        filename: 'types/graphql.d.ts',
      },
      plugins: [
        {
          add: {
            content:
              '/* eslint-disable */\n/* THIS IS AN AUTO GENERATED FILE - DO NOT MODIFY */\n',
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
