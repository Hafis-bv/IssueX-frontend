const AUTH_COOKIE_NAME = "token";
const MAX_AGE_DAYS = 7;

export function setAuthCookie(): void {
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
  if (typeof document !== "undefined") {
    document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; max-age=${maxAge}; SameSite=Lax`;
  }
}

export function clearAuthCookie(): void {
  if (typeof document !== "undefined") {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
  }
}
