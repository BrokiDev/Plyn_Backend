import { db } from '../../utils/db.server';

export const getAllUserService = async (): Promise<
  Array<{
    id: number;
    uuid: string;
    fName: string;
    lName: string;
    companyName: string | null;
    email: string;
  }>
> => {
  const data = await db.users.findMany();

  return data;
};
