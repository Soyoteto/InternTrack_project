"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type ApplicationFormValues } from "./schema";
import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";

interface ApplicationFormProps {
  onSubmitAction: (data: ApplicationFormValues) => Promise<void>;
}

export const ApplicationForm = ({ onSubmitAction }: ApplicationFormProps) => {
  const methods = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: "",
      position: "",
      url: "",
      recruiterEmail: "",
      notes: "",
      followUpDate: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitAction)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput name="company" label="Company Name" placeholder="Google, Meta, etc." />
          <FormInput name="position" label="Position" placeholder="Frontend Developer" />
        </div>

        <FormInput name="url" label="Job URL (Optional)" placeholder="https://linkedin.com/..." type="url" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput name="recruiterEmail" label="Recruiter Email (Optional)" placeholder="hr@company.com" type="email" />
          <FormInput name="followUpDate" label="Follow-up Date (Optional)" type="date" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Interview Notes (Optional)</label>
          <textarea 
            {...methods.register("notes")} 
            placeholder="Things to remember for the interview..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none text-sm"
          />
        </div>
        
        <SubmitButton className="w-full">Create Application</SubmitButton>
      </form>
    </FormProvider>
  );
};