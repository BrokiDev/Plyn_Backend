import { type $Enums } from '@prisma/client';
import {
  hashedPasswordService,
  verifyPasswordService,
} from '../../helpers/encrypt.service';
import { db } from '../../utils/db.server';
import { type User } from '../../interfaces/Users.interface';
import { generateToken } from '../../helpers/jwt.service';

export const createUserService = async (dataBody: User): Promise<User> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const salts = 8;
  const newPass = hashedPasswordService(dataBody.password, salts);
  if (dataBody.password !== '') {
    dataBody.password = newPass;
  }
  const user = db.usuarios.create({
    data: dataBody,
  });
  const Response = await user;
  return Response;
};

export const getAllUserService = async (): Promise<
  Array<{
    id: number;
    fName: string;
    lName: string;
    companyName: string | null;
    email: string;
    password: string;
    role: $Enums.Role;
  }>
> => {
  const data = db.usuarios.findMany();
  const response = await data;
  return response;
};

export const loginControllerService = async (
  email: string,
  password: string,
): Promise<{
  token: string;
  user: {
    email: string;
  };
}> => {
  const user = await db.usuarios.findFirst({
    where: { email },
    select: { email: true, role: true, password: true, id: true },
  });

  if (user == null) {
    throw new Error('Invalid Credentials');
  }

  const isPasswordValid = verifyPasswordService(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid Credentials');
  }

  const token = generateToken(email);

  const data = {
    token,
    user: {
      email: user.email,
    },
  };
  return data;
};
