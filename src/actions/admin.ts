'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { verifySession } from './auth';

export async function getAllUsers() {
    const session = await verifySession();
    
    if (!session || session.role !== 'admin') {
        return { success: false, error: "Unauthorized access" };
    }

    try {
        const allUsers = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            isBanned: users.isBanned
        }).from(users);
        
        return { success: true, data: allUsers };
    } catch  {
        return { success: false, error: "Failed to fetch users" };
    }
}

export async function toggleBanStatus(userId: string, currentStatus: boolean) {
    const session = await verifySession();
    
    if (!session || session.role !== 'admin') {
        return { success: false, error: "Unauthorized" };
    }
    
    if (session.id === userId) {
        return { success: false, error: "You cannot ban yourself." };
    }

    try {
        await db.update(users)
            .set({ isBanned: !currentStatus })
            .where(eq(users.id, userId));
            
        revalidatePath('/admin');
        return { success: true };
    } catch  {
        return { success: false, error: "Failed to update ban status" };
    }
}