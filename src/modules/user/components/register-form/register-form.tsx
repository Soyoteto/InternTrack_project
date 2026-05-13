"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterFormValues } from "./schema";
import { FormInput } from "../../../../components/form/form-input";
import { SubmitButton } from "../../../../components/form/submit-button";
import { registerUser } from "../../../../actions/auth";


export function RegisterForm() {
    const router = useRouter();
    const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
    },
});

const onSubmit = async (data: RegisterFormValues) => {
    try {
        const response = await registerUser(data);
        if (response?.success) {
        router.push("/login");
    }
    } catch (error) {
        console.error(error);
    }
};

return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput name="email" label="Email" type="email" placeholder="student@muni.cz" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="confirmPassword" label="Confirm Password" type="password" />

        <SubmitButton className="w-full">
            Create Account
        </SubmitButton>
    </form>
    </FormProvider>
    );
}