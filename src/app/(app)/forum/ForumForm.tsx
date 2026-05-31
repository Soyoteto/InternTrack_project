"use client";

import { createPost } from "@/actions/forum";
import { useRef } from "react";

export default function ForumForm() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleAction = async (formData: FormData) => {
        const result = await createPost(formData);
        if (result.success) {
            formRef.current?.reset();
        }
    };

    return (
        <form ref={formRef} action={handleAction} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Topic Title</label>
                <input type="text" id="title" name="title" required placeholder="e.g. Tips for Google Interview?" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400" />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea id="content" name="content" required rows={4} placeholder="Share your thoughts..." className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-slate-900 placeholder:text-slate-400" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Post Message
            </button>
        </form>
    );
}