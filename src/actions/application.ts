'use server';

import { db } from '@/db';
import { applications } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { verifySession } from './auth';

export async function getApplications(userId: string) {
  try {
    const session = await verifySession();
    if (!session || (session.id !== userId && session.role !== 'admin')) {
        return { success: false, error: "Unauthorized access" };
    }

    const data = await db.select().from(applications).where(eq(applications.userId, userId));
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to fetch applications" };
  }
}

export async function createApplication(company: string, position: string) {
  try {
    const session = await verifySession();
    if (!session || session.isBanned) return { success: false, error: "Unauthorized" };

    await db.insert(applications).values({
      company,
      position,
      userId: session.id, 
      status: 'Pending',
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create application" };
  }
}

export async function updateApplicationStatus(id: number, newStatus: "Pending" | "Interview" | "Rejected" | "Accepted") {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: "Unauthorized" };

    if (session.role !== 'admin') {
        await db.update(applications)
          .set({ status: newStatus })
          .where(and(eq(applications.id, id), eq(applications.userId, session.id)));
    } else {
        await db.update(applications)
          .set({ status: newStatus })
          .where(eq(applications.id, id));
    }
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteApplication(id: number) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: "Unauthorized" };

    if (session.role !== 'admin') {
        await db.delete(applications)
          .where(and(eq(applications.id, id), eq(applications.userId, session.id)));
    } else {
        await db.delete(applications).where(eq(applications.id, id));
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete application" };
  }
}

export async function getAllPlatformApplications() {
  try {
    const session = await verifySession();
    if (!session || session.role !== 'admin') {
        return { success: false, error: "Admin access required" };
    }

    const data = await db.select().from(applications);
    const totalApplications = data.length;
    const acceptedCount = data.filter(app => app.status === 'Accepted').length;
    
    return { success: true, data, stats: { totalApplications, acceptedCount } };
  } catch (error) {
    return { success: false, error: "Failed to fetch all applications" };
  }
}