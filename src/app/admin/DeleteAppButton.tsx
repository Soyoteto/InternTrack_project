"use client";

import { deleteApplication } from "@/actions/application";
import { Trash2 } from "lucide-react";

export default function DeleteAppButton({ appId }: { appId: number }) {
  const handleAction = async () => {
    await deleteApplication(appId);
  };

  return (
    <form action={handleAction}>
      <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete application">
        <Trash2 size={16} />
      </button>
    </form>
  );
}