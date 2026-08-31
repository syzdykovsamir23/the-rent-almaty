"use client";

import { deleteCar } from "@/app/admin/actions";

export function DeleteCarButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteCar}
      onSubmit={(e) => {
        if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="cursor-pointer text-xs font-medium text-[#B4232C] transition-opacity hover:opacity-70"
      >
        Delete
      </button>
    </form>
  );
}
