import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../server/trpc';
import UserController from '@/controllers/user';

export const user = router({ 
  // Protected endpoints
  getUser: protectedProcedure
    .query(async ({ ctx }) => {
      return UserController.getUser(ctx);
    }),

  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      settings: z.object({
        theme: z.enum(['light', 'dark', 'system']).optional(),
        notifications: z.boolean().optional(),
      }).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const updateData = {
        ...input,
        settings: input.settings ? {
          id: '',
          userId: ctx.userId,
          theme: input.settings.theme || 'system',
          notifications: input.settings.notifications ?? true,
          createdAt: new Date(),
          updatedAt: new Date(),
        } : undefined,
      };
      
      return UserController.updateProfile(ctx, updateData);
    }),

  deleteAccount: protectedProcedure
    .mutation(async ({ ctx }) => {
      return UserController.deleteAccount(ctx);
    }),
}); 