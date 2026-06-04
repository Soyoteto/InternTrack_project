import { redirect } from "next/navigation";
import { verifySession } from "@/actions/auth";
import { getPosts } from "@/data/forum"; 
import { MessageSquare, ShieldCheck, User } from "lucide-react";
import { Metadata } from "next";
import ForumForm from "@/modules/forum/components/forum-form/forum-form";

const formatDate = (dateData: Date | string | number | null | undefined) => {
    try {
        if (!dateData) return new Date().toLocaleDateString();
        const parsedDate = new Date(dateData);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toLocaleDateString();
        }
    } catch {
    }
    return new Date().toLocaleDateString();
};

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
                        <ForumForm />
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
                                            {post.createdAt ? formatDate(post.createdAt) : 'Just now'}
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