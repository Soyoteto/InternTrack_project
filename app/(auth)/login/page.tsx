import { LoginForm } from '@/modules/user/components/login-form/login-form';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                    <p className="mt-2 text-gray-600">Sign in to track your applications</p>
                </div>

                <LoginForm />

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                        Sign up here
                    </Link>
                </div>

            </div>
        </div>
    );
}
