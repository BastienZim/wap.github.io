export function basePath(p: string) {
  const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!p) return p;
  if (/^https?:\/\//i.test(p)) return p; // already absolute URL
  const withSlash = p.startsWith("/") ? p : `/${p}`;
  return `${bp}${withSlash}`;
}
