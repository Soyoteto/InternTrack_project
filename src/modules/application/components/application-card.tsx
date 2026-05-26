'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Building2, Briefcase, Loader2, Link as LinkIcon, Mail, Calendar, FileText, Pencil } from 'lucide-react';
import { updateApplicationStatus } from '@/actions/application';
import Link from 'next/link';

type Application = {
    id: number;
    company: string;
    position: string;
    userId: string;
    status: string;
    url?: string | null;
    recruiterEmail?: string | null;
    notes?: string | null;
    followUpDate?: Date | string | null;
};

const statusColors: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-900 border-amber-200',
    Interview: 'bg-blue-100 text-blue-900 border-blue-200',
    Rejected: 'bg-rose-100 text-rose-900 border-rose-200',
    Accepted: 'bg-emerald-100 text-emerald-900 border-emerald-200'
};

export const ApplicationCard = ({ application }: { application: Application }) => {
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (newStatus: "Pending" | "Interview" | "Rejected" | "Accepted") => {
        startTransition(async () => {
            const result = await updateApplicationStatus(application.id, newStatus);
            if (result.success) {
                toast.success(`Status updated to ${newStatus}`);
            } else {
                toast.error(result.error || 'Failed to update status');
            }
        });
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-indigo-200 transition-colors flex flex-col h-full">
            {isPending && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
                    <Loader2 className="animate-spin text-indigo-600" size={24} />
                </div>
            )}

            <div className="flex justify-between items-start mb-3">
                <div className="max-w-[70%]">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 truncate">
                        <Building2 size={18} className="text-slate-500 shrink-0" />
                        {application.company}
                    </h3>
                    <p className="text-slate-600 flex items-center gap-2 mt-1 truncate">
                        <Briefcase size={16} className="text-slate-500 shrink-0" />
                        {application.position}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[application.status] || 'bg-slate-100 text-slate-800 border-slate-200'}`}>
                        {application.status}
                    </span>
                    <Link
                        href={`/edit/${application.id}`}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
                        title="Edit application"
                    >
                        <Pencil size={14} />
                    </Link>
                </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
                {application.url && (
                    <a href={application.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1.5 w-fit">
                        <LinkIcon size={14} /> View Job Offer
                    </a>
                )}
                {application.recruiterEmail && (
                    <a href={`mailto:${application.recruiterEmail}`} className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 w-fit">
                        <Mail size={14} /> {application.recruiterEmail}
                    </a>
                )}
                {application.followUpDate && (
                    <p className="text-xs text-amber-600 font-medium flex items-center gap-1.5">
                        <Calendar size={14} /> Follow-up: {new Date(application.followUpDate).toLocaleDateString()}
                    </p>
                )}
            </div>

            {application.notes && (
                <div className="mb-4 p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 flex items-start gap-2 flex-grow">
                    <FileText size={14} className="shrink-0 mt-0.5 text-slate-400" />
                    <p className="line-clamp-3 italic">&quot;{application.notes}&quot;</p>
                </div>
            )}

            <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                    onClick={() => handleStatusChange('Pending')}
                    disabled={isPending || application.status === 'Pending'}
                    className="text-xs font-semibold px-2 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 disabled:opacity-30 transition-all"
                >
                    Pending
                </button>
                <button
                    onClick={() => handleStatusChange('Interview')}
                    disabled={isPending || application.status === 'Interview'}
                    className="text-xs font-semibold px-2 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 disabled:opacity-30 transition-all"
                >
                    Interview
                </button>
                <button
                    onClick={() => handleStatusChange('Accepted')}
                    disabled={isPending || application.status === 'Accepted'}
                    className="text-xs font-semibold px-2 py-2 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 disabled:opacity-30 transition-all"
                >
                    Accepted
                </button>
                <button
                    onClick={() => handleStatusChange('Rejected')}
                    disabled={isPending || application.status === 'Rejected'}
                    className="text-xs font-semibold px-2 py-2 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 disabled:opacity-30 transition-all"
                >
                    Rejected
                </button>
            </div>
        </div>
    );
};