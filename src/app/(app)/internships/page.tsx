import { redirect } from "next/navigation";
import { verifySession } from "@/actions/auth";
import { getInternships } from "@/data/internship"; 
import { Briefcase, Building2, ExternalLink, PlusCircle } from "lucide-react";
import { Metadata } from "next";

import InternshipForm from "./InternshipForm";

export const metadata: Metadata = {
    title: 'Internship Offers',
};

export default async function InternshipsPage() {
    const user = await verifySession();
    if (!user) redirect("/login");

    const response = await getInternships();
    const offers = response.data || [];

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-indigo-950 flex items-center justify-center gap-3">
                    <Briefcase className="text-indigo-600" size={32} />
                    Internship Board
                </h1>
                <p className="text-slate-500 mt-2 font-medium">Discover new opportunities selected by your administrators.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {user.role === 'admin' && (
                    <div className="lg:col-span-1">
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm sticky top-6">
                            <h2 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                                <PlusCircle size={20} /> Add New Offer
                            </h2>
                            <InternshipForm />
                        </div>
                    </div>
                )}

                <div className={user.role === 'admin' ? "lg:col-span-2 space-y-4" : "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6"}>
                    {offers.length === 0 ? (
                        <div className="col-span-full text-center p-10 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                            <p className="text-slate-500">No internship offers available right now. Check back later!</p>
                        </div>
                    ) : (
                        offers.map((offer) => (
                            <div key={offer.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="bg-slate-100 p-3 rounded-xl text-slate-500 shrink-0">
                                        <Building2 size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 leading-tight">{offer.position}</h3>
                                        <p className="text-slate-500 font-medium">{offer.company}</p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                                    <p className="text-xs text-slate-400">
                                        Added {offer.createdAt ? new Date(offer.createdAt).toLocaleDateString() : 'recently'}
                                    </p>

                                    {offer.url ? (
                                        <a
                                            href={offer.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors"
                                        >
                                            Apply Now <ExternalLink size={16} />
                                        </a>
                                    ) : (
                                        <span className="text-sm font-bold text-slate-400">No link provided</span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}