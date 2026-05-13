import { RegisterForm } from "../../../modules/user/components/register-form/register-form";
import { Card } from "../../../components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md bg-white p-6 shadow-lg">
        <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-bold text-center">
                Sign Up
            </h2>
        </div>
        
        <div>
            <RegisterForm />
        
        <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link 
                href="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >
                Sign in
            </Link>
            </div>
        </div>
        </Card>
    </div>
    );
}