"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * `?next=` arrives from the URL, so it can point anywhere. Only same-site
 * absolute paths under /admin are honoured — everything else (a full URL, a
 * protocol-relative `//evil.com`, a path outside the panel) falls back.
 */
function safeNext(value: string | null): string {
  if (!value) return "/admin";
  if (!value.startsWith("/") || value.startsWith("//")) return "/admin";
  if (!value.startsWith("/admin")) return "/admin";
  return value;
}

export function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormInner />
    </Suspense>
  );
}

function LoginFormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured.");
      setPending(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });

    if (signInError) {
      setError(signInError.message);
      setPending(false);
      return;
    }

    router.replace(safeNext(params.get("next")));
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 rounded-lg border border-[#E1E4E8] bg-white p-6">
      <label className="block text-xs font-semibold text-[#6B7684]">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1.5 w-full rounded-md border border-[#E1E4E8] px-3 py-2 text-sm font-normal text-[#1F2933] outline-none focus:border-[#1F2933]"
        />
      </label>

      <label className="mt-4 block text-xs font-semibold text-[#6B7684]">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-md border border-[#E1E4E8] px-3 py-2 text-sm font-normal text-[#1F2933] outline-none focus:border-[#1F2933]"
        />
      </label>

      {error ? (
        <p className="mt-4 rounded-md bg-[#FDECEC] px-3 py-2 text-xs text-[#B4232C]">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full cursor-pointer rounded-md bg-[#1F2933] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#323F4B] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
