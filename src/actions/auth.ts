'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { type LoginValues } from '@/modules/user/components/login-form/schema';

export const loginUser = async (data: LoginValues) => {
    const result = await db.select().from(users).where(eq(users.email, data.email));
    const user = result[0];

    if (!user || user.password !== data.password) {
        return { error: "Invalid credentials. Please try again." };
    }

    const cookieStore = await cookies();
    const sessionData = JSON.stringify({ 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
    });
    
    cookieStore.set('auth_session', sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7
    });

    return { success: true, role: user.role };
};

export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('auth_session');
    redirect('/login');
};

export const verifySession = async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get('auth_session')?.value;
    if (!session) return null;

    try {
        return JSON.parse(session);
    } catch (error) {
        return null;
    }
};