import { PrismaClient } from '@prisma/client';
import { IncomingMessage } from 'http';
import { DefaultSession, User } from 'next-auth';
import { getSession } from 'next-auth/react';

import { prisma } from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
  user?: DefaultSession['user'];
};

export type CreateContextArgs = {
  req: IncomingMessage;
};

export async function createContext({
  req,
}: CreateContextArgs): Promise<Context> {
  const session = await getSession({ req });

  return {
    prisma,
    user: session?.user,
  };
}
