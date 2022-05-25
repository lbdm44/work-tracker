import { PrismaClient } from '@prisma/client';
import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';

import { prisma } from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
  accessToken?: string;
};

export type CreateContextArgs = {
  req: IncomingMessage;
};

export async function createContext({
  req,
}: CreateContextArgs): Promise<Context> {
  const session = await getSession({ req });

  console.log(`createContext:accessToken: ${session?.accessToken}`);

  return {
    prisma,
    accessToken: session?.accessToken,
  };
}
