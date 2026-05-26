import { redirect } from "next/navigation";
import { ApplicationForm } from "@/modules/application/components/application-form";
import { Card } from "@/components/ui/card";
import { getApplicationById, updateApplication } from "@/actions/application";
import { verifySession } from "@/actions/auth";
import { type ApplicationFormValues } from "@/modules/application/components/application-form/schema";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await verifySession();
    if (!user) redirect("/login");

    const resolvedParams = await params;
    const appId = parseInt(resolvedParams.id);

    const response = await getApplicationById(appId);

    if (!response.success || !response.data) {
        return <div className="text-center mt-10 text-red-600 font-semibold">Application not found or Unauthorized.</div>;
    }

    const app = response.data;

    const formattedDate = app.followUpDate
        ? new Date(app.followUpDate).toISOString().split('T')[0]
        : "";

    const initialData = {
        company: app.company,
        position: app.position,
        url: app.url || "",
        recruiterEmail: app.recruiterEmail || "",
        notes: app.notes || "",
        followUpDate: formattedDate,
    };

    const handleUpdate = async (formData: ApplicationFormValues) => {
        "use server";
        const result = await updateApplication(appId, formData);
        if (result.success) {
            redirect("/dashboard");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-slate-900 tracking-tight">
                Edit Application
            </h1>
            <Card className="p-8 border-2 shadow-md bg-white">
                <ApplicationForm onSubmitAction={handleUpdate} initialData={initialData} />
            </Card>
        </div>
    );
}