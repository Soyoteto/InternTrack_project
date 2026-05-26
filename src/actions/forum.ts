'use server';

import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { verifySession } from './auth';

export async function getPosts() {
    try {
        const session = await verifySession();
        if (!session) return { success: false, error: "Unauthorized" };

        const data = await db.select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            createdAt: posts.createdAt,
            authorName: users.name,
            authorRole: users.role
        })
            .from(posts)
            .leftJoin(users, eq(posts.authorId, users.id))
            .orderBy(desc(posts.createdAt)); 

        return { success: true, data };
    } catch (error) {
        return { success: false, error: "Failed to fetch posts" };
    }
}

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
    } catch (error) {
        return { success: false, error: "Failed to create post" };
    }
}