import { signOut } from "@/app/admin/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="cursor-pointer rounded-md border border-[#E1E4E8] bg-white px-3 py-1.5 text-xs font-medium text-[#6B7684] transition-colors hover:border-[#C9CED6] hover:text-[#1F2933]"
      >
        Sign out
      </button>
    </form>
  );
}
