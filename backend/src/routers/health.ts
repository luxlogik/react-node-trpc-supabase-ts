import { router, publicProcedure } from '@/server/trpc';

export const health = router({
  health: publicProcedure.query(() => {
    return {
      status: 'ok',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    };
  }),
}); 