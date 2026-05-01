"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type ApplicationFormValues } from "./schema";
import { FormInput } from "../../../../components/form/form-input";
import { SubmitButton } from "../../../../components/form/submit-button";

// Defines the props for the ApplicationForm, expecting an onSubmit action (passed by the parent page)
interface ApplicationFormProps {
  onSubmitAction: (data: ApplicationFormValues) => Promise<void>;
}

// The main form component for creating or editing an application
export const ApplicationForm = ({ onSubmitAction }: ApplicationFormProps) => {
  // Initializes react-hook-form with the Zod validation schema
  const methods = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: "",
      position: "",
      date: new Date().toISOString().split("T")[0], // Defaults to today's date
      status: "Pending",
    },
  });

  return (
    // Wraps the form in a Provider so child components (FormInput, SubmitButton) can access the form state
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitAction)} className="space-y-4">
        <FormInput name="company" label="Company Name" placeholder="Google, Meta, etc." />
        <FormInput name="position" label="Position" placeholder="Frontend Developer" />
        <FormInput name="date" label="Application Date" type="date" />
        
        <SubmitButton className="w-full">Create Application</SubmitButton>
      </form>
    </FormProvider>
  );
};