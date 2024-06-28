import { PrismaClient } from "@prisma/client";

// import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = await prisma.users.create({
    data: {
      email: 'brokidev3@gmail.com',
      fName: 'Bryan',
      lName: 'Ramirez',
      companyName: 'BrokiDev',
      role: {
        create:{
            name: "ADMIN"
        }
      },
      password: {
        create: {
            password: '12345'
        }
      }

    },
  });
}
void main().then(() => {
  // eslint-disable-next-line no-console
  console.log('Finished');
});
