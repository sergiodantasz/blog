import { randomInt } from 'crypto';

const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateRandomString(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHANUMERIC[randomInt(ALPHANUMERIC.length)];
  }
  return result;
}
