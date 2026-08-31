import { LoginForm } from "@/components/admin/LoginForm";
import { NotConfigured } from "@/components/admin/NotConfigured";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function AdminLoginPage() {
  if (!isSupabaseConfigured) return <NotConfigured />;
  return (
    <div className="mx-auto max-w-sm pt-8">
      <h1 className="text-xl font-bold">Sign in</h1>
      <p className="mt-1.5 text-sm text-[#6B7684]">
        Owner access only. Accounts are created in the Supabase dashboard.
      </p>
      <LoginForm />
    </div>
  );
}
