import { router } from '../server/trpc';
import { health } from './health';
import { user } from './user';

export const appRouter = router({
  health,
  user,
});

export type AppRouter = typeof appRouter;
 