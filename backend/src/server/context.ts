import { TRPCError, initTRPC } from '@trpc/server';
import { supabase } from '@/lib/supabase';
import { logger } from '@/lib/logger'; 
import { type CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

export type Context = {
  req: CreateHTTPContextOptions['req'];
  res: CreateHTTPContextOptions['res'];
  userId?: string; 
};

const t = initTRPC.context<Context>().create();
const middleware = t.middleware;

export async function createContext(opts: CreateHTTPContextOptions): Promise<Context> {
  const baseContext: Context = {
    req: opts.req,
    res: opts.res,
  };

  try {
    const authHeader = opts.req.headers.authorization; 

    if (!authHeader?.startsWith('Bearer ')) {
      logger.warn('No Bearer token in auth header');
      return baseContext;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      logger.warn('Empty token after Bearer');
      return baseContext;
    }
 
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      logger.error('Supabase auth error:', { error });
      return baseContext;
    }

    if (!user) {
      logger.warn('No user found for token');
      return baseContext;
    }
 
    return {
      ...baseContext,
      userId: user.id,
    };
  } catch (error) {
    logger.error('Error in createContext:', { error });
    return baseContext;
  }
}

// Protected middleware that requires authentication
export const protectedMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    logger.warn('Protected route accessed without userId');
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authenticated',
    });
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});

// Public middleware that requires store access
export const publicMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    logger.warn('Public route accessed without userId');
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Store access required',
    });
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});
