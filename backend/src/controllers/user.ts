import { TRPCError } from '@trpc/server';
import { supabase } from '@/lib/supabase'; 
import type { User } from '@/shared/types';
import UsersModel from '@/models/users'; 
import { Context } from '@/server/context';

export default class UserController { 
  static async getUser(ctx: Context) { 
      return UsersModel.getUser(ctx);
  }

  static async updateProfile(ctx: Context, data: Partial<User>) {
    return UsersModel.updateProfile(ctx, data);
  }

  static async deleteAccount(ctx: Context) {
     await UsersModel.deleteAccount(ctx);
  }
} 