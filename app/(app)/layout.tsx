import { redirect } from 'next/navigation';
import { verifySession } from '@/actions/auth';
import { type PropsWithChildren } from 'react';

export default async function AppLayout({ children }: PropsWithChildren) {
    const user = await verifySession();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
