import { basePath } from "./basePath";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

export function resolveSrc(src: string | StaticImport) {
  if (typeof src === "string" && src.startsWith("/")) return `${basePath}${src}`;
  return src;
}
