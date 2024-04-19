/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (global.__db == null) {
  global.__db = new PrismaClient();
}

// eslint-disable-next-line prefer-const
db = global.__db;

export { db };
