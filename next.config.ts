import type { NextConfig } from "next";

/**
 * LumiTale's legal pages (Phase 3J-AU) are static files that the publication
 * gate (scripts/lumitale-legal-gate.mjs) places in public/lumitale/ only when
 * they may be served. These rewrites map the approved URLs
 * /lumitale/{privacy,terms,delete-account} to those files; when the files are
 * absent (the default) the routes return 404. A trailing slash redirects to
 * the slashless URL (Next.js default), which is the canonical form.
 */
const lumitaleLegalRoutes = ["privacy", "terms", "delete-account"];

// The LumiTale pages' own policy: first-party scripts/styles/fonts only, and
// network access to the LumiTale V2 Supabase project for account deletion.
const lumitaleSecurityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'none'",
      "script-src 'self'",
      "style-src 'self'",
      "img-src 'self'",
      "font-src 'self'",
      "connect-src https://jvvjjoplfyruyzsuxmkd.supabase.co",
      "base-uri 'none'",
      "form-action 'none'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cache-Control", value: "no-cache" },
];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: lumitaleLegalRoutes.map((route) => ({
        source: `/lumitale/${route}`,
        destination: `/lumitale/${route}/index.html`,
      })),
      fallback: [],
    };
  },
  async headers() {
    return [{ source: "/lumitale/:path*", headers: lumitaleSecurityHeaders }];
  },
};

export default nextConfig;
