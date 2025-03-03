import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

export interface ParsedAuthJwt {
  exp: number; // 1683435770
}

/**
 * @return number - days
 */
export function getTokenExpires(token: string) {
  const expireAt = jwtDecode<ParsedAuthJwt>(token).exp * 1000;
  return dayjs(expireAt).diff(dayjs(), 'days');
}
