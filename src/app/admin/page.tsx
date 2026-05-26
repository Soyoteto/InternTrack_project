import { getAllPlatformApplications, deleteApplication } from "@/actions/application";
import { getAllUsers, toggleBanStatus } from "@/actions/admin";
import { logoutUser } from "@/actions/auth";
import { LogOut, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";

export default async function AdminDashboard() {
  const appsResponse = await getAllPlatformApplications();
  const usersResponse = await getAllUsers();
  
  const apps = appsResponse.data || [];
  const usersList = usersResponse.data || [];
  const stats = appsResponse.stats || { totalApplications: 0, acceptedCount: 0 };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-950 mb-1">Admin Panel</h1>
            <p className="text-slate-500 font-medium">Global platform overview</p>
          </div>
          <form action={logoutUser}>
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 transition-all shadow-sm">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <h2 className="text-xl font-bold text-indigo-950">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
  <thead className="bg-slate-50 border-b border-slate-200">
    <tr>
      <th className="p-4 font-bold text-slate-600">Company</th>
      <th className="p-4 font-bold text-slate-600">Position</th>
      <th className="p-4 font-bold text-slate-600">Status</th>
      <th className="p-4 font-bold text-slate-600">User ID</th>
      <th className="p-4 font-bold text-slate-600 text-right">Action</th>
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
        <td className="p-4 text-right">
          <form action={async () => {
            "use server";
            await deleteApplication(app.id);
          }}>
            <button 
              type="submit" 
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Delete application"
            >
              <Trash2 size={16} />
            </button>
          </form>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-white">
            <h2 className="text-xl font-bold text-indigo-950">All Applications</h2>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}