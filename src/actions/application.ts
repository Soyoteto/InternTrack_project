'use server';

import { db } from '@/db';
import { applications } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getApplications(userId: string) {
  try {
    const data = await db.select().from(applications).where(eq(applications.userId, userId));
    return { success: true, data };
  } catch (error) {
    console.error("Error in getApplications:", error);
    return { success: false, error: "Failed to fetch applications" };
  }
}

export async function createApplication(company: string, position: string, userId: string) {
  try {
    await db.insert(applications).values({
      company,
      position,
      userId,
      status: 'Pending',
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Error in createApplication:", error);
    return { success: false, error: "Failed to create application" };
  }
}

export async function updateApplicationStatus(id: number, newStatus: "Pending" | "Interview" | "Rejected" | "Accepted") {
  try {
    await db.update(applications)
      .set({ status: newStatus })
      .where(eq(applications.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Error in updateApplicationStatus:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteApplication(id: number) {
  try {
    await db.delete(applications).where(eq(applications.id, id));
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Error in deleteApplication:", error);
    return { success: false, error: "Failed to delete application" };
  }
}


export async function getAllPlatformApplications() {
  try {
    const data = await db.select().from(applications);
    
    const totalApplications = data.length;
    const acceptedCount = data.filter(app => app.status === 'Accepted').length;
    
    return { 
      success: true, 
      data, 
      stats: { totalApplications, acceptedCount } 
    };
  } catch (error) {
    console.error("Error in getAllPlatformApplications:", error);
    return { success: false, error: "Failed to fetch all applications" };
  }
}