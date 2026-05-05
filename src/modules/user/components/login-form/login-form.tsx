'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { loginSchema, type LoginValues } from './schema';
import { loginUser } from '@/actions/auth';
import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';

export const LoginForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const methods = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
    });

    const onSubmit = (data: LoginValues) => {
        startTransition(async () => {
            const result = await loginUser(data);
            if (result?.error) {
                toast.error(result.error);
            } else if (result?.success) {
                toast.success('Login successful!');
                if (result.role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/dashboard');
                }
            }
        });
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormInput label="Email" name="email" type="email" />
                <FormInput label="Password" name="password" type="password" />

                <SubmitButton isPending={isPending}>Log in</SubmitButton>
            </form>
        </FormProvider>
    );
};
