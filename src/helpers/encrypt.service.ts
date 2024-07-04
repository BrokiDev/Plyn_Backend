import { hashSync, compareSync } from 'bcrypt';
import crypto from 'crypto';
import { configDotenv } from 'dotenv';

configDotenv({ path: '.env' });

export const hashedPasswordService = (pass: string, salts: number): string => {
  const passwordModified = hashSync(pass, salts);
  return passwordModified;
};

export const verifyPasswordService = (
  pass: string,
  passEncrypted: string,
): boolean => {
  const passwordValidator = compareSync(pass, passEncrypted);
  return passwordValidator;
};

const algorithm = `${process.env.ALGORITHM_ENCRYPT}`;
const secretKey = `${process.env.ALGORITHM_KEY}`;
const iv = crypto.randomBytes(16);
const key = crypto.createHash('sha256').update(secretKey).digest();

export const encryptCookie = (text: string): string => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decryptCookie = (hash: string): string => {
  if (hash === undefined || hash === null || hash === '') {
    return '';
  }
  const parts = hash.split(':');
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const iv = Buffer.from(parts.shift() as string, 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString();
};
