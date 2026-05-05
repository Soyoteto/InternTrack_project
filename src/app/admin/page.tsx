import { getAllPlatformApplications } from "@/actions/application";
import { logoutUser } from "@/actions/auth";
import { LogOut } from "lucide-react";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel',
};

export default async function AdminDashboard() {
  const response = await getAllPlatformApplications();
  const apps = response.data || [];
  const stats = response.stats || { totalApplications: 0, acceptedCount: 0 };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-950 mb-1">Admin Panel</h1>
            <p className="text-slate-500 font-medium">Global platform overview</p>
          </div>
          
          <form action={logoutUser}>
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Applications</h3>
            <p className="text-5xl font-extrabold text-indigo-600">{stats.totalApplications}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Accepted Offers</h3>
            <p className="text-5xl font-extrabold text-emerald-500">{stats.acceptedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-white">
            <h2 className="text-xl font-bold text-indigo-950">All Users Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold text-slate-600">Company</th>
                  <th className="p-4 font-bold text-slate-600">Position</th>
                  <th className="p-4 font-bold text-slate-600">Status</th>
                  <th className="p-4 font-bold text-slate-600">User ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {apps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">{app.company}</td>
                    <td className="p-4 text-slate-600">{app.position}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-semibold text-xs border border-slate-200">
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-xs">{app.userId}</td>
                  </tr>
                ))}
                {apps.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">
                      No applications found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}