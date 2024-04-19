import { hashSync, compareSync } from 'bcrypt';

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
