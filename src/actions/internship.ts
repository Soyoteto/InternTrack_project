'use server';

import { db } from '@/db';
import { internships } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { verifySession } from './auth';

export async function getInternships() {
    try {
        const session = await verifySession();
        if (!session) return { success: false, error: "Unauthorized" };

        const data = await db.select().from(internships).orderBy(desc(internships.createdAt));
        return { success: true, data };
    } catch  {
        return { success: false, error: "Failed to fetch internships" };
    }
}

export async function createInternship(formData: FormData) {
    try {
        const session = await verifySession();

        if (!session || session.role !== 'admin') {
            return { success: false, error: "Only admins can post internships" };
        }

        const company = formData.get('company') as string;
        const position = formData.get('position') as string;
        const url = formData.get('url') as string;

        if (!company || !position) return { success: false, error: "Fields are required" };

        await db.insert(internships).values({
            company,
            position,
            url: url || null,
        });

        revalidatePath('/internships');
        return { success: true };
    } catch  {
        return { success: false, error: "Failed to create internship" };
    }
}