'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type LoginValues, type RegisterValues } from '@/modules/user/components/login-form/schema';

export const loginUser = async (data: LoginValues) => {
    if (data.email === "test@test.com" && data.password === "123456") {
        const cookieStore = await cookies();
        cookieStore.set('auth_session', 'my_secure_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7
        });
        return { success: true };
    }
    return { error: "Invalid credentials" };
};

export const registerUser = async (data: RegisterValues) => {
    const cookieStore = await cookies();
    cookieStore.set('auth_session', 'my_secure_token', { httpOnly: true });
    return { success: true };
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

    return { id: "1", name: "Student Test", email: "test@test.com" };
};
