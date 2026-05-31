import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verifySession } from '@/actions/auth';

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
    } catch  {
        return { success: false, error: "Failed to fetch posts" };
    }
}