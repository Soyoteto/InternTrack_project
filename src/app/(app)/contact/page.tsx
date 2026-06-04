import { Mail } from "lucide-react";
import ContactForm from "@/modules/contact/components/contact-form/contact-form";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-950 flex items-center justify-center gap-3">
          <Mail className="text-indigo-600" size={32} />
          Contact Companies
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Reach out directly to recruiters and HR departments.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}