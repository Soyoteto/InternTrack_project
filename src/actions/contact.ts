"use server";

import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { verifySession } from "@/actions/auth";

export async function submitContactMessage(formData: FormData) {
  try {
    const user = await verifySession();
    if (!user) {
      return { success: false, error: "You must be logged in to send a message." };
    }

    const company = formData.get("company") as string;
    const department = formData.get("department") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!company || !department || !subject || !message) {
      return { success: false, error: "All fields are required." };
    }

    await db.insert(contactMessages).values({
      company,
      department,
      subject,
      message,
    });

    return { success: true };
    
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { success: false, error: "Failed to send the message. Please try again." };
  }
}