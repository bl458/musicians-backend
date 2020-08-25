export function validateToken(token: string): boolean {
  return !token || token !== token.trim() || token.length !== 512
    ? false
    : true;
}
