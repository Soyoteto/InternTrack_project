"use client";

import { useForm, FormProvider } from "react-hook-form";
import { createInternship } from "@/actions/internship";
import { FormInput } from "@/components/form/form-input"; 

export default function InternshipForm() {
    const methods = useForm();
    const handleAction = async (formData: FormData) => {
        const result = await createInternship(formData);
        if (result.success) {
            methods.reset();
        }
    };

    return (
        <FormProvider {...methods}>
            <form action={handleAction} className="space-y-4">
                <FormInput
                    name="company"
                    label="Company"
                    placeholder="e.g. Spotify"
                    required
                />
                <FormInput
                    name="position"
                    label="Position"
                    placeholder="e.g. Backend Engineer Intern"
                    required
                />
                <FormInput
                    type="url"
                    name="url"
                    label="Apply URL (Optional)"
                    placeholder="https://..."
                />
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Publish Offer
                </button>
            </form>
        </FormProvider>
    );
}