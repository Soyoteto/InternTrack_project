import { redirect } from 'next/navigation';

import { verifySession } from '@/actions/auth';
import { getApplications } from '@/actions/application';
import { ApplicationBoard } from '@/modules/application/components/application-board';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
    const user = await verifySession();

    if (!user) {
        redirect('/login');
    }

    const result = await getApplications(user.id);
    const applications = result.data || [];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
                <p className="text-slate-700 font-medium mt-2">Track and manage your internship and job applications.</p>
            </div>

            <ApplicationBoard applications={applications} />
        </div>
    );
}