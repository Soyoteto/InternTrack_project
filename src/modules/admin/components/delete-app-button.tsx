"use client";

import { deleteApplication } from "@/actions/application";
import { Trash2, Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function DeleteAppButton({ appId }: { appId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(async () => {
      await deleteApplication(appId);
    });
  };

  return (
    <form action={handleAction}>
      <button 
        type="submit" 
        disabled={isPending}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
        title="Delete application"
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin text-red-500" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    </form>
  );
}