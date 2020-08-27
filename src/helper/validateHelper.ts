export function validateToken(token: string): boolean {
  return token && token === token.trim() && token.length === 512;
}

export function validateMSpeed(mspeed: number): boolean {
  return mspeed < 35 || mspeed > 220;
}
