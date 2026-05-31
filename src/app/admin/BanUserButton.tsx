"use client";

import { toggleBanStatus } from "@/actions/admin";

export default function BanUserButton({ userId, isBanned }: { userId: string, isBanned: boolean }) {
  const handleAction = async (formData: FormData) => {
    await toggleBanStatus(formData);
  };

  return (
    <form action={handleAction}>
      <input type="hidden" name="userId" value={userId} />
      <button type="submit" className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors shadow-sm ${isBanned ? 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50' : 'bg-white border border-rose-200 text-rose-700 hover:bg-rose-50'}`}>
        {isBanned ? 'Unban User' : 'Ban User'}
      </button>
    </form>
  );
}