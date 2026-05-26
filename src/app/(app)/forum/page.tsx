import { redirect } from "next/navigation";
import { verifySession } from "@/actions/auth";
import { getPosts, createPost } from "@/actions/forum";
import { MessageSquare, ShieldCheck, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Community Forum',
};

export default async function ForumPage() {
    const user = await verifySession();
    if (!user) redirect("/login");

    const response = await getPosts();
    const allPosts = response.data || [];

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-indigo-950 flex items-center justify-center gap-3">
                    <MessageSquare className="text-indigo-600" size={32} />
                    Community Forum
                </h1>
                <p className="text-slate-500 mt-2 font-medium">Ask questions, share tips, and help other students.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Start a Discussion</h2>
                        <form action={createPost} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Topic Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="e.g. Tips for Google Interview?"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    required
                                    rows={4}
                                    placeholder="Share your thoughts..."
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                                Post Message
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    {allPosts.length === 0 ? (
                        <div className="text-center p-10 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                            <p className="text-slate-500">No discussions yet. Be the first to post!</p>
                        </div>
                    ) : (
                        allPosts.map((post) => (
                            <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-hover hover:border-indigo-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-full ${post.authorRole === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                                        {post.authorRole === 'admin' ? <ShieldCheck size={18} /> : <User size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                            {post.authorName}
                                            {post.authorRole === 'admin' && (
                                                <span className="bg-indigo-600 text-white text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm">Admin</span>
                                            )}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Just now'}
                                        </p>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-slate-800 mb-2">{post.title}</h3>
                                <p className="text-slate-600 text-sm whitespace-pre-wrap">{post.content}</p>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
