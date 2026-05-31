'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { verifySession } from './auth';

export async function toggleBanStatus(formData: FormData) {
  try {
    const session = await verifySession();
    if (!session || session.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }
    const userId = formData.get('userId') as string;
    if (!userId) return { success: false, error: "User ID missing" };
    const targetUser = await db.select().from(users).where(eq(users.id, userId));
    
    if (targetUser.length === 0) {
      return { success: false, error: "User not found" };
    }
    const newStatus = !targetUser[0].isBanned;
    await db.update(users)
      .set({ isBanned: newStatus })
      .where(eq(users.id, userId));
    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update ban status" };
  }
}