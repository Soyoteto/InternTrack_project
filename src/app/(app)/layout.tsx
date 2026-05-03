import { type PropsWithChildren } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';

import { verifySession, logoutUser } from '@/actions/auth';

export default async function AppLayout({ children }: PropsWithChildren) {
    const user = await verifySession();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden flex-col md:flex-row">
            <header className="md:hidden bg-white border-b-2 border-slate-200 px-4 py-4 flex items-center justify-between shrink-0">
                <h1 className="text-xl font-bold text-indigo-700">InternTrack</h1>
                <form action={logoutUser}>
                    <button type="submit" className="text-slate-700 hover:text-red-700 transition-colors">
                        <LogOut size={22} />
                    </button>
                </form>
            </header>

            <aside className="hidden md:flex w-64 bg-white border-r-2 border-slate-200 flex-col shrink-0">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-2xl font-bold text-indigo-700">InternTrack</h1>
                    <p className="text-sm font-bold text-slate-700 mt-1 uppercase tracking-wider">User: {user.name}</p>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-3">
                    <Link 
                        href="/dashboard" 
                        className="flex items-center gap-3 px-3 py-2 text-slate-900 font-semibold rounded-md hover:bg-indigo-50 hover:text-indigo-700 transition-all border border-transparent hover:border-indigo-100"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link 
                        href="/create" 
                        className="flex items-center gap-3 px-3 py-2 text-slate-900 font-semibold rounded-md hover:bg-indigo-50 hover:text-indigo-700 transition-all border border-transparent hover:border-indigo-100"
                    >
                        <PlusCircle size={20} />
                        New Application
                    </Link>
                </nav>

                <div className="p-4 border-t-2 border-slate-200 bg-slate-50">
                    <form action={logoutUser}>
                        <button 
                            type="submit" 
                            className="flex items-center w-full gap-3 px-3 py-2 text-slate-900 font-bold rounded-md hover:bg-red-100 hover:text-red-700 transition-all border border-slate-200"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto mb-16 md:mb-0">
                {children}
            </main>

            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 flex justify-around p-3 z-50">
                <Link 
                    href="/dashboard" 
                    className="flex flex-col items-center p-1 text-slate-900 font-bold hover:text-indigo-700"
                >
                    <LayoutDashboard size={26} />
                    <span className="text-[11px] mt-1">Dashboard</span>
                </Link>
                <Link 
                    href="/create" 
                    className="flex flex-col items-center p-1 text-slate-900 font-bold hover:text-indigo-700"
                >
                    <PlusCircle size={26} />
                    <span className="text-[11px] mt-1">New</span>
                </Link>
            </nav>
        </div>
    );
}