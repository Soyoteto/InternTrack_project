'use client';

import { useState } from 'react';
import { ApplicationCard } from './application-card';

type Application = {
    id: number;
    company: string;
    position: string;
    userId: string;
    status: string;
};

type FilterType = "All" | "Pending" | "Interview" | "Accepted" | "Rejected";

const filters: FilterType[] = ["All", "Pending", "Interview", "Accepted", "Rejected"];

export const ApplicationBoard = ({ applications }: { applications: Application[] }) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>("All");

    const filteredApplications = applications.filter(
        (app) => activeFilter === "All" || app.status === activeFilter
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeFilter === filter
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {filteredApplications.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-lg border border-slate-200">
                    <p className="text-slate-500">
                        {activeFilter === "All" 
                            ? "No applications found. Create one to get started!" 
                            : `No applications found with status: ${activeFilter}`}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredApplications.map((app) => (
                        <ApplicationCard key={app.id} application={app} />
                    ))}
                </div>
            )}
        </div>
    );
};