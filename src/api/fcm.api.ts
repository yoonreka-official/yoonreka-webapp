import { gql } from '@apollo/client'

import { appolo } from '~/utils/apollo.util.ts'

export type DeviceType = 'ANDROID' | 'IOS'

export interface UserDeviceInput {
  token: string
  type: DeviceType
  userAgent: string
}

export const upsertUserDevice = (input: UserDeviceInput) => {
  return appolo.mutate({
    mutation: gql`
      mutation UpsertUserDevice($input: UpsertUserDeviceInput!) {
        upsertUserDevice(input: $input) {
          id
        }
      }
    `,
    variables: {
      input,
    },
  })
}
