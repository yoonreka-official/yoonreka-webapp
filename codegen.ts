import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:18000/graphql',
  documents: ['gql/**/*.gql'],
  generates: {
    './src/types/api.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        noGraphQLTag: true,
        scalars: {
          Date: 'string',
          EmailAddress: 'string',
          HexColorCode: 'string',
          ReferralCode: 'string',
          Timestamp: 'number',
          URL: 'string',
        },
      },
    },
  },
}
export default config
