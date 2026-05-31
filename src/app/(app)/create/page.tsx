import { redirect } from "next/navigation";
import { ApplicationForm } from "@/modules/application/components/application-form";
import { Card } from "@/components/ui/card";
import { createApplication } from "@/actions/application";
import { verifySession } from "@/actions/auth";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Application',
};

export default async function CreatePage() {
  const user = await verifySession();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-slate-900 tracking-tight">
        Add New Application
      </h1>
      <Card className="p-8 border-2 shadow-md bg-white">
        <ApplicationForm onSubmitAction={createApplication} />
      </Card>
    </div>
  );
}