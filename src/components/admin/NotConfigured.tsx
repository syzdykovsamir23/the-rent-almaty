export function NotConfigured() {
  return (
    <div className="rounded-lg border border-[#E1E4E8] bg-white p-8">
      <h1 className="text-lg font-bold">Supabase is not connected yet</h1>
      <p className="mt-2 max-w-xl text-sm text-[#6B7684]">
        The admin panel needs a Supabase project before it can store cars. Copy{" "}
        <code className="rounded bg-[#F4F5F7] px-1.5 py-0.5 text-[0.8em]">.env.example</code> to{" "}
        <code className="rounded bg-[#F4F5F7] px-1.5 py-0.5 text-[0.8em]">.env.local</code>, fill in
        the project URL and anon key, then follow{" "}
        <code className="rounded bg-[#F4F5F7] px-1.5 py-0.5 text-[0.8em]">supabase/README.md</code>.
      </p>
      <p className="mt-3 max-w-xl text-sm text-[#6B7684]">
        The public site keeps working in the meantime — the catalog simply shows its empty state.
      </p>
    </div>
  );
}
