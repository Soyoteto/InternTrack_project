import { db } from "@/db";
import { users } from "@/db/schema";

export async function getAllUsers() {
  try {
    const allUsers = await db.select().from(users);
    return { success: true, data: allUsers };
  } catch {
    return { success: false, error: "Failed to fetch users" };
  }
}