import { gql } from '@apollo/client'

import { appolo, setToken as setAppoloToken } from '~/utils/apollo.util.ts'
import { setCookie } from '~/utils/cookie.util.ts'
import { getTokenExpires } from '~/utils/jwt.utils.ts'

import type {
  AuthTokenPair,
  AuthUser,
  LoginBody,
  UpdateUserBody,
} from '~/types/auth.type.ts'

export const setTokens = ({ accessToken, refreshToken }: AuthTokenPair) => {
  setAppoloToken(accessToken)

  setCookie('accessToken', accessToken, {
    expires: getTokenExpires(accessToken),
  })

  setCookie('refreshToken', refreshToken, {
    expires: getTokenExpires(refreshToken),
  })
}

export const signIn = async (variables: LoginBody) => {
  const res = await appolo.mutate<{ signInByPhone: AuthTokenPair }>({
    mutation: gql`
      mutation SignInByPhone(
        $phone: PhoneNumber!
        $password: String!
        $deviceType: DeviceType
        $token: String
        $userAgent: String
      ) {
        signInByPhone(
          phone: $phone
          password: $password
          deviceType: $deviceType
          token: $token
          userAgent: $userAgent
        ) {
          accessToken
          refreshToken
        }
      }
    `,
    variables,
  })

  if (!res.data?.signInByPhone) {
    throw new Error('로그인 실패했습니다.')
  }

  setTokens(res.data.signInByPhone)

  return res
}

export const fetchAuthUser = async (signal: AbortSignal) => {
  try {
    const res = await appolo.query<{ currentUser: AuthUser }>({
      query: gql`
        query GetCurrentUser {
          currentUser {
            birthDate
            code
            gender
            grade
            id
            name
            parentName
            parentPhone
            payDueDay
            phone
            registeredDate
            school {
              id
              name
            }
            state
            lectures {
              id
              title
            }

            isDistractionMode
            distractionEndTime
            distractionStartTime
          }
        }
      `,
      context: {
        fetchOptions: { signal },
      },
    })

    if (!res.data?.currentUser) {
      // eslint-disable-next-line
      throw new Error('로그인 실패했습니다.');
    }

    return res
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('fetchAuthUser --- 요청이 중단됨')
      return null
    }
    throw error
  }
}

export const updateAuthUser = (input: UpdateUserBody) => {
  return appolo.mutate({
    mutation: gql`
      mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          id
          isDistractionMode
          distractionStartTime
          distractionEndTime
        }
      }
    `,
    variables: { input },
  })
}

export const signOut = (token: string) => {
  return appolo.mutate<{ signInByPhone: AuthTokenPair }>({
    mutation: gql`
      mutation SignOut($token: String!) {
        signOut(token: $token)
      }
    `,
    variables: { token },
  })
}

export const withdrawUser = () => {
  return appolo.mutate<{ signInByPhone: AuthTokenPair }>({
    mutation: gql`
      mutation Withdraw {
        withdraw
      }
    `,
  })
}
