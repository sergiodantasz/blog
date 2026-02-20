import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function hashPassword(plainText: string): Promise<string> {
  const hash = await bcrypt.hash(plainText, SALT_ROUNDS);
  return Buffer.from(hash).toString('base64');
}

export async function verifyPassword(plainText: string, encodedHash: string): Promise<boolean> {
  const hash = Buffer.from(encodedHash, 'base64').toString('utf-8');
  return await bcrypt.compare(plainText, hash);
}
