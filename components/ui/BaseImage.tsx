import React from "react";
import { basePath } from "@/lib/basePath";

type BaseImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  /** If true, makes the image absolutely fill its positioned parent (parent must be relative). */
  fill?: boolean;
  /** object-fit to apply when using fill (defaults to cover) */
  objectFit?: React.CSSProperties["objectFit"];
  /** object-position for fine control when using fill */
  objectPosition?: string;
};

export default function BaseImage({
  src,
  fill = false,
  objectFit = "cover",
  objectPosition,
  className = "",
  style,
  ...rest
}: BaseImageProps) {
  const resolved = basePath(src);

  if (fill) {
    return (
      <img
        src={resolved}
        className={["absolute inset-0 h-full w-full", className].filter(Boolean).join(" ")}
        style={{ objectFit, objectPosition, ...style }}
        // Provide good defaults for performance when user forgets
        loading={rest.loading || "lazy"}
        decoding={rest.decoding || "async"}
        {...rest}
      />
    );
  }

  return (
    <img
      src={resolved}
      className={className}
      style={style}
      loading={rest.loading || "lazy"}
      decoding={rest.decoding || "async"}
      {...rest}
    />
  );
}
