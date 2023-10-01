/** @type {import("@graphql-codegen/cli").CodegenConfig} */

const config = {
  overwrite: true,
  // For each graphql version, generate the types to their own folder
  generates: {
    './src/graphql/v1/types/types.d.ts': {
      schema: 'src/graphql/v1/typeDefs/*.ts',
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  require: 'ts-node/register',
};

export default config;
