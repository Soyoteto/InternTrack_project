import { LoginForm } from '@/modules/user/components/login-form/login-form';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border-2 border-slate-200">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900">Welcome back</h1>
                    <p className="mt-2 text-slate-700 font-medium">Sign in to track your applications</p>
                </div>

                <LoginForm />

                <div className="mt-6 text-center text-sm text-slate-900 font-medium">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-bold text-indigo-700 hover:underline">
                        Sign up here
                    </Link>
                </div>

            </div>
        </div>
    );
}