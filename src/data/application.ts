import { verifySession } from "@/actions/auth";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getApplications(userId: string) {
  try {
    const session = await verifySession();
    if (!session || (session.id !== userId && session.role !== 'admin')) {
      return { success: false, error: "Unauthorized access" };
    }

    const data = await db.select().from(applications).where(eq(applications.userId, userId));
    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to fetch applications" };
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
  } catch {
    return { success: false, error: "Failed to fetch all applications" };
  }
}

export async function getApplicationById(id: number) {
  try {
    const session = await verifySession();
    if (!session) return { success: false, error: "Unauthorized" };

    const result = await db.select().from(applications).where(eq(applications.id, id));
    const app = result[0];

    if (!app) return { success: false, error: "Application not found" };

    if (session.role !== 'admin' && app.userId !== session.id) {
      return { success: false, error: "Unauthorized access" };
    }

    return { success: true, data: app };
  } catch {
    return { success: false, error: "Failed to fetch application" };
  }
}