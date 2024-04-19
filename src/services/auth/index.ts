import { hashedPasswordService } from '../../../helpers/encrypt.service';
import { db } from '../../../utils/db.server';

interface User {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createUserService = async (dataBody: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAllUserService = async () => {
  const data = db.usuarios.findMany();
  const response = await data;
  return response;
};
