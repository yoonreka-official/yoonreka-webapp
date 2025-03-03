import type { DeviceType } from '~/api/fcm.api.ts';

export interface LoginInput {
  phone: string;
  password: string;
}

export interface LoginBody extends LoginInput {
  deviceType?: DeviceType;
  token?: string;
  userAgent?: string;
}

export type Gender = 'MALE' | 'FEMALE';

/** 학생 상태 */
export enum UserState {
  /** 재원 */
  ENROLLED = 'ENROLLED',
  /** 수업예정 */
  SCHEDULED = 'SCHEDULED',
  /** 휴원 */
  SUSPENDED = 'SUSPENDED',
  /** 퇴원 */
  WITHDRAWN = 'WITHDRAWN',
}

export interface AuthUser {
  id: string;
  birthDate: string;
  code: string;
  gender: Gender;
  grade: number;
  name: string;

  phone: string;
  registeredDate: string;
  school: {
    id: string;
    name: string;
  };
  state: UserState;

  parentName: string;
  parentPhone: string;
  payDueDay: number;

  lectures: Array<{
    id: string;
    title: string;
  }>;
}

export interface AuthTokenPair {
  accessToken: string;
  refreshToken: string;
}
