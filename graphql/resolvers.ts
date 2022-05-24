import { Context } from './context';

export const resolvers = {
  Query: {
    links: async (_: unknown, __: unknown, ctx: Context) => {
      return await ctx.prisma.link.findMany();
    },
  },
};
