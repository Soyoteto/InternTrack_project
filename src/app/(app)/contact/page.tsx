"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send, Loader2, Building2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setIsSuccess(false);
    const formData = new FormData(form);
    const company = formData.get("company") as string;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success(`Message successfully sent to ${company}!`);
    form.reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };


  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-950 flex items-center justify-center gap-3">
          <Mail className="text-indigo-600" size={32} />
          Contact Companies
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Reach out directly to recruiters and HR departments.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
        {isSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-bold text-emerald-800">Message Sent!</h3>
              <p className="text-emerald-600 text-sm mt-1">
                Your email has been forwarded to the company&apos;s recruitment team. You will receive a copy in your inbox shortly.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="company" className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                <Building2 size={16} className="text-slate-400" /> Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                placeholder="e.g. Microsoft"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-bold text-slate-700 mb-1.5">Department</label>
              <select
                id="department"
                name="department"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
              >
                <option value="hr">Human Resources</option>
                <option value="tech">Tech & Engineering Team</option>
                <option value="general">General Inquiries</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-1.5">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder="Application for Frontend Developer position"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1.5">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Dear Hiring Manager..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}