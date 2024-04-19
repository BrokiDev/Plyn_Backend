import { hashSync, compareSync } from 'bcrypt';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const hashedPasswordService = (pass: string, salts: number) => {
  const passwordModified = hashSync(pass, salts);
  return passwordModified;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const verifyPasswordService = (pass: string, passEncrypted: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const passwordValidator = compareSync(pass, passEncrypted);
  return passwordValidator;
};
