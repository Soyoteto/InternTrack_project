import { redirect } from "next/navigation";
import { verifySession } from "@/actions/auth";
import { getApplications } from "@/actions/application";
import DashboardClient from "./DashboardClient";
import { LayoutDashboard } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Dashboard',
};

export default async function DashboardPage() {
  const user = await verifySession();
  if (!user) redirect("/login");

  const response = await getApplications(user.id);
  const applications = response.data || [];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-950 flex items-center gap-3">
          <LayoutDashboard className="text-indigo-600" size={32} />
          My Applications
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Manage and track your job search progress.</p>
      </div>

      <DashboardClient applications={applications} />
    </div>
  );
}