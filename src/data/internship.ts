import { db } from "@/db";
import { internships } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getInternships() {
  try {
    const allInternships = await db.select().from(internships).orderBy(desc(internships.createdAt));
    return { success: true, data: allInternships };
  } catch (error) {
    console.error("Error fetching internships:", error);
    return { success: false, error: "Failed to fetch internships", data: [] };
  }
}