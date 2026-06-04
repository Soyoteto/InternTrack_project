import { redirect } from "next/navigation";
import { getAllPlatformApplications } from "@/data/application";
import { getAllUsers } from "@/data/admin"; 
import { verifySession, logoutUser } from "@/actions/auth";
import { LogOut, ShieldCheck, User, Ban, Users } from "lucide-react";
import Link from "next/link";
import BanUserButton from "@/modules/admin/components/ban-user-button";
import DeleteAppButton from "@/modules/admin/components/delete-app-button";

export default async function AdminDashboard() {
  const currentUser = await verifySession();
  if (!currentUser || currentUser.role !== 'admin') redirect("/");
  
  const appsResponse = await getAllPlatformApplications();
  const apps = appsResponse.data || [];
  const stats = appsResponse.stats || { totalApplications: 0, acceptedCount: 0 };
  
  const usersResponse = await getAllUsers();
  const usersList = usersResponse.data || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-950 mb-1">Admin Panel</h1>
            <p className="text-slate-500 font-medium">Global platform overview</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-all text-sm border border-indigo-100">
              Back to App
            </Link>
            <form action={logoutUser}>
              <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 transition-all shadow-sm text-sm">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </form>
          </div>
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
            <h2 className="text-xl font-bold text-indigo-950">Platform Applications</h2>
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
                      <DeleteAppButton appId={app.id} />
                    </td>
                  </tr>
                ))}
                {apps.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500">No applications found on the platform.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-white">
            <h2 className="text-xl font-bold text-indigo-950 flex items-center gap-2">
              <Users size={24} className="text-indigo-600" /> User Management
            </h2>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {usersList.map((u) => (
                <div key={u.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${u.isBanned ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200 hover:border-indigo-200'}`}>
                  
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full shrink-0 ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-white border border-slate-200 text-slate-400'}`}>
                      {u.role === 'admin' ? <ShieldCheck size={20} /> : <User size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 flex items-center gap-2">
                        {u.name} 
                        {u.role === 'admin' && <span className="text-[10px] uppercase tracking-wider bg-indigo-600 text-white px-2 py-0.5 rounded-full">Admin</span>}
                        {u.isBanned && <span className="text-[10px] uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1"><Ban size={10} /> Banned</span>}
                      </p>
                      <p className="text-sm text-slate-500">{u.email}</p>
                    </div>
                  </div>

                  {u.id !== currentUser.id && (
                    <BanUserButton userId={u.id} isBanned={u.isBanned} />
                  )}
                </div>
              ))}
              
              {usersList.length === 0 && (
                <p className="text-center text-slate-500 py-4">No users found.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}