import type { NextConfig } from "next";

/** Car photos live in Supabase Storage, so next/image has to trust that host. */
const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

const isDev = process.env.NODE_ENV === "development";

/**
 * The app renders no user-authored HTML, so `script-src 'unsafe-inline'` is the
 * pragmatic trade-off for Next's inline bootstrap payloads. Everything that
 * actually limits blast radius — object-src, base-uri, frame-ancestors,
 * form-action and a closed default-src — is locked down.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  `img-src 'self' data: blob:${supabaseHost ? ` https://${supabaseHost}` : ""} https://maps.gstatic.com https://maps.googleapis.com https://*.googleusercontent.com`,
  `connect-src 'self'${supabaseHost ? ` https://${supabaseHost} wss://${supabaseHost}` : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Downloads/ has its own stray package-lock.json; pin the workspace root so
  // Turbopack does not walk up out of the project.
  turbopack: { root: __dirname },

  poweredByHeader: false,

  images: {
    formats: ["image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // The panel must never end up in a search index or a third-party frame.
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
