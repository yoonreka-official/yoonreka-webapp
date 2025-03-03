import Cookies from 'js-cookie';

interface CookieAttributes {
  expires?: number | Date | undefined;
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;
}

export const setCookie = (
  name: string,
  value: string,
  options?: CookieAttributes,
) => {
  Cookies.set(name, value, options);
};

export const getAllCookies = () => {
  return Cookies.get();
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export function removeCookie(name: string, domain?: string): void {
  Cookies.remove(name, { path: '/', secure: true, domain });
}
