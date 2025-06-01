import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import { protectedMiddleware, publicMiddleware } from './context';

export function getHttpStatusCodeForError(key: number) {
  return key;
}

const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { error } = opts;
    const code = error.code === 'INTERNAL_SERVER_ERROR' ? 500 : 
                error.code === 'UNAUTHORIZED' ? 401 :
                error.code === 'FORBIDDEN' ? 403 :
                error.code === 'NOT_FOUND' ? 404 : 500;
    return {
      code,
      message: error.message,
      data: {
        httpStatus: code,
      },
    };
  },
});

export const router = t.router;
export const middleware = t.middleware;
 
export const protectedProcedure = t.procedure.use(protectedMiddleware);
export const publicProcedure = t.procedure.use(publicMiddleware);