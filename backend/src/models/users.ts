import { supabase, getContextClient } from "@/lib/supabase";
import type { Context } from '@/server/context';
import { User } from "@/shared/types";

const userSelect = `
    id,
    name,
    email,
    created_at,
    settings:user_settings!inner (
        theme,
        notifications
    )
`;
export default class UsersModel {
    static async getUser(ctx: Context) {
        const client = getContextClient(ctx);

        // Get user data
        const { data: user, error: userError } = await client
            .from('users')
            .select('id, name, email, created_at')
            .eq('id', ctx.userId)
            .single();

        if (userError) {
            throw userError;
        }

        // Get user settings
        const { data: settings, error: settingsError } = await client
            .from('user_settings')
            .select('theme, notifications')
            .eq('user_id', ctx.userId)
            .single();

        // Don't throw error if settings don't exist, just use defaults
        const userSettings = settingsError ? null : settings;

        return {
            ...user,
            settings: userSettings
        };
    }

    static async updateProfile(ctx: Context, data: {
        name?: string;
        email?: string;
        settings?: {
            theme?: 'light' | 'dark' | 'system';
            notifications?: boolean;
        };
    }) {
        const client = getContextClient(ctx);

        // Start transaction-like operations
        let updatedUser;

        // Update user data if provided
        if (data.name !== undefined || data.email !== undefined) {
            const { data: user, error } = await client
                .from('users')
                .update({
                    ...(data.name !== undefined && { name: data.name }),
                    ...(data.email !== undefined && { email: data.email }),
                })
                .eq('id', ctx.userId)
                .select('id, name, email, created_at')
                .single();

            if (error) {
                throw error;
            }
            updatedUser = user;
        } else {
            // Get current user data
            const { data: user, error } = await client
                .from('users')
                .select('id, name, email, created_at')
                .eq('id', ctx.userId)
                .single();

            if (error) {
                throw error;
            }
            updatedUser = user;
        }

        // Update settings if provided
        if (data.settings) {
            const { error: settingsError } = await client
                .from('user_settings')
                .upsert({
                    user_id: ctx.userId,
                    ...(data.settings.theme !== undefined && { theme: data.settings.theme }),
                    ...(data.settings.notifications !== undefined && { notifications: data.settings.notifications }),
                }, {
                    onConflict: 'user_id'
                });

            if (settingsError) {
                throw settingsError;
            }
        }

        // Get final user with settings
        const { data: settings, error: settingsError } = await client
            .from('user_settings')
            .select('theme, notifications')
            .eq('user_id', ctx.userId)
            .single();

        return {
            ...updatedUser,
            settings: settingsError ? null : settings
        };
    }

    static async deleteAccount(ctx: Context) {
        const client = getContextClient(ctx);

        await client.from('user_settings').delete().eq('user_id', ctx.userId);

        await client.from('users').delete().eq('id', ctx.userId);
    }
}