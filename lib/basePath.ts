/**
 * Prefix a relative asset path with the configured NEXT_PUBLIC_BASE_PATH (used for GitHub Pages
 * project sites) AND defensively URL‑encode every individual segment so that files containing
 * spaces, apostrophes, accented letters or other special characters are still served correctly
 * once deployed. (Browsers usually auto‑encode, but static hosting + prefetching can be picky.)
 *
 * NOTES
 *  - Absolute (http/https) URLs are returned untouched.
 *  - Leading slash is ensured ("images/foo.jpg" => "/images/foo.jpg").
 *  - Query string + hash (if any) are preserved without double encoding.
 */
export function basePath(p: string) {
  if (!p) return p;
  if (/^https?:\/\//i.test(p)) return p; // already absolute URL

  const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Separate query + hash so we only encode the pathname segments
  let pathPart = p;
  let query = "";
  let hash = "";

  const hashIdx = pathPart.indexOf("#");
  if (hashIdx >= 0) {
    hash = pathPart.slice(hashIdx);
    pathPart = pathPart.slice(0, hashIdx);
  }
  const queryIdx = pathPart.indexOf("?");
  if (queryIdx >= 0) {
    query = pathPart.slice(queryIdx);
    pathPart = pathPart.slice(0, queryIdx);
  }

  const withSlash = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;

  // Encode each segment individually (skip first empty segment from leading slash)
  const encoded = withSlash
    .split("/")
    .map((seg, i) => {
      if (i === 0) return ""; // keep leading slash
      if (!seg) return seg;
      try {
        // Decode first (in case already encoded) then re‑encode for consistency
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        // Fallback: best effort encode
        return encodeURIComponent(seg);
      }
    })
    .join("/");

  return `${bp}/${encoded}${query}${hash}`.replace(/\/+/, "/");
}
