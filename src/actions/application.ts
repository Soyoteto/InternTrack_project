'use server';

import { db } from '@/db';
import { applications } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { verifySession } from './auth';

export async function createApplication(data: {
  company: string;
  position: string;
  url?: string;
  recruiterEmail?: string;
  notes?: string;
  followUpDate?: string
}) {
  try {
    const session = await verifySession();
    if (!session || session.isBanned) return { success: false, error: "Unauthorized" };

    let parsedDate = null;
    if (data.followUpDate) {
      parsedDate = new Date(data.followUpDate);
    }

    await db.insert(applications).values({
      company: data.company,
      position: data.position,
      userId: session.id,
      status: 'Pending',
      url: data.url || null,
      recruiterEmail: data.recruiterEmail || null,
      notes: data.notes || null,
      followUpDate: parsedDate,
    });

    revalidatePath('/');
    return { success: true };
  } catch (error){
    console.error("Error creating application:", error);
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
  } catch {
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
  } catch {
    return { success: false, error: "Failed to delete application" };
  }
}

export async function updateApplication(id: number, data: {
  company: string;
  position: string;
  url?: string;
  recruiterEmail?: string;
  notes?: string;
  followUpDate?: string;
}) {
  try {
    const session = await verifySession();
    if (!session || session.isBanned) return { success: false, error: "Unauthorized" };

    const result = await db.select().from(applications).where(eq(applications.id, id));
    const app = result[0];
    if (!app) return { success: false, error: "Not found" };
    if (session.role !== 'admin' && app.userId !== session.id) {
      return { success: false, error: "Unauthorized" };
    }

    let parsedDate = null;
    if (data.followUpDate) {
      parsedDate = new Date(data.followUpDate);
    }

    await db.update(applications)
      .set({
        company: data.company,
        position: data.position,
        url: data.url || null,
        recruiterEmail: data.recruiterEmail || null,
        notes: data.notes || null,
        followUpDate: parsedDate,
      })
      .where(eq(applications.id, id));

    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update application" };
  }
}