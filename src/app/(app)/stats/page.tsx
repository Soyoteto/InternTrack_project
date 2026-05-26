import { redirect } from "next/navigation";
import { verifySession } from "@/actions/auth";
import { getApplications } from "@/actions/application";
import { Target, TrendingUp, Briefcase, Award, AlertCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Analytics',
};

export default async function StatsPage() {
  const user = await verifySession();
  if (!user) redirect("/login");

  const response = await getApplications(user.id);
  const apps = response.data || [];

  const total = apps.length;
  const pending = apps.filter(a => a.status === 'Pending').length;
  const interviews = apps.filter(a => a.status === 'Interview').length;
  const accepted = apps.filter(a => a.status === 'Accepted').length;
  const rejected = apps.filter(a => a.status === 'Rejected').length;

  const successRate = total > 0 ? Math.round((accepted / total) * 100) : 0;
  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;

  const getWidth = (count: number) => total > 0 ? `${(count / total) * 100}%` : '0%';

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-950 flex items-center gap-3">
          <TrendingUp className="text-indigo-600" size={32} />
          My Analytics
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Track your application performance and success rates.</p>
      </div>

      {total === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center shadow-sm">
          <AlertCircle className="mx-auto text-slate-400 mb-4" size={48} />
          <h2 className="text-xl font-bold text-slate-700">No data available yet</h2>
          <p className="text-slate-500 mt-2">Start adding applications to see your statistics!</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden">
              <div className="bg-indigo-50 p-4 rounded-xl">
                <Briefcase className="text-indigo-600" size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Sent</p>
                <p className="text-3xl font-extrabold text-slate-900">{total}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden">
              <div className="bg-blue-50 p-4 rounded-xl">
                <Target className="text-blue-600" size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Interview Rate</p>
                <p className="text-3xl font-extrabold text-slate-900">{interviewRate}%</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden">
              <div className="bg-emerald-50 p-4 rounded-xl">
                <Award className="text-blue-600" size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Success Rate</p>
                <p className="text-3xl font-extrabold text-slate-900">{successRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Application Pipeline</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-blue-700">Pending</span>
                  <span className="text-blue-600">{pending} ({getWidth(pending)})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="bg-blue-400 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: getWidth(pending) }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-blue-700">Interviews</span>
                  <span className="text-slate-600">{interviews} ({getWidth(interviews)})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="bg-blue-500 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: getWidth(interviews) }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-emerald-700">Offers (Accepted)</span>
                  <span className="text-slate-600">{accepted} ({getWidth(accepted)})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="bg-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: getWidth(accepted) }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-rose-700">Rejected</span>
                  <span className="text-slate-600">{rejected} ({getWidth(rejected)})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="bg-rose-500 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: getWidth(rejected) }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}