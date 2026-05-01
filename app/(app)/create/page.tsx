import * as React from "react";
import { ApplicationForm } from "../../../modules/application/components/application-form";
import { Card } from "../../../components/ui/card";
///////////////////////////////////////////////////////////////////////
// import { createApplication } from "../../../actions/application";

// The Create Application page (React Server Component)
export default function CreatePage() {
  
  // A wrapper function to handle the server action submission
  const handleCreate = async (data: any) => {
    "use server";
    // TODO: Database insertion here (Role 1)
    // await createApplication(data);
    console.log("Form data received on server:", data);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Application</h1>
      <Card className="p-6">
        <ApplicationForm onSubmitAction={handleCreate} />
      </Card>
    </div>
  );
}