"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { ApplicationCard } from "@/modules/application/components/application-card";

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

export default function DashboardClient({ applications }: { applications: Application[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredApps = applications.filter((app) => {
        const matchesSearch = 
            app.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
            app.position.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === "All" || app.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by company or position..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors text-slate-700"
                    />
                </div>

                <div className="relative min-w-[180px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors appearance-none text-slate-700 font-medium"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Interview">Interview</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {filteredApps.length === 0 ? (
                <div className="text-center p-10 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                    <p className="text-slate-500 font-medium">No applications match your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApps.map((app) => (
                        <ApplicationCard key={app.id} application={app} />
                    ))}
                </div>
            )}
        </div>
    );
}