'use server';

import { db } from '@/db';
import { posts } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { verifySession } from './auth';

export async function createPost(formData: FormData) {
    try {
        const session = await verifySession();
        if (!session || session.isBanned) return { success: false, error: "Unauthorized" };

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        if (!title || !content) return { success: false, error: "Fields are required" };

        await db.insert(posts).values({
            title,
            content,
            authorId: session.id
        });

        revalidatePath('/forum');
        return { success: true };
    } catch  {
        return { success: false, error: "Failed to create post" };
    }
}