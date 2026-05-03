'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Building2, Briefcase, Loader2 } from 'lucide-react';
import { updateApplicationStatus } from '@/actions/application';

type Application = {
    id: number;
    company: string;
    position: string;
    userId: string;
    status: string;
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
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-indigo-200 transition-colors">
            {isPending && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
                    <Loader2 className="animate-spin text-indigo-600" size={24} />
                </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
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
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[application.status] || 'bg-slate-100 text-slate-800 border-slate-200'}`}>
                    {application.status}
                </span>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
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