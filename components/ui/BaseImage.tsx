import React from "react";
import NextImage, { ImageProps } from "next/image";
import { basePath } from "@/lib/basePath";

type BaseImageProps = Omit<ImageProps, "src" | "alt"> & {
  /** Path relative to public folder or absolute URL */
  src: string;
  /** Accessible alt text (required). Use empty string for decorative images. */
  alt: string;
  /** Force regular <img> layout with given width/height (if you pass width/height and not fill). */
  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: string;
  /** When false, missing dimensions will only emit a warning in dev instead of throwing. Default: true */
  strict?: boolean;
};

export default function BaseImage({
  src,
  alt,
  fill,
  objectFit = "cover",
  objectPosition,
  className,
  style,
  sizes,
  priority,
  quality,
  strict = true,
  ...rest
}: BaseImageProps) {
  const resolved = basePath(src);

  // When using fill, parent must be relative; we pass style overrides
  if (fill) {
    return (
      <NextImage
        src={resolved}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        className={className}
        style={{ objectFit, objectPosition, ...style }}
        priority={priority}
        quality={quality}
        {...rest}
      />
    );
  }

  // If consumer did not supply width/height, we fallback to 1x1 transparent pixel prevention by requiring them.
  // Encourage explicit sizing for CLS stability. We'll throw in dev if missing.
  if (process.env.NODE_ENV !== 'production') {
    const { width, height } = rest as { width?: number; height?: number };
    if (!fill && (width == null || height == null)) {
      const msg = `BaseImage: Missing width/height for src="${src}". Provide both width and height props, or set fill`;
      if (strict) {
        throw new Error(msg);
      } else {
        // eslint-disable-next-line no-console
        console.warn(msg);
      }
    }
  }

  return (
    <NextImage
      src={resolved}
      alt={alt}
      width={(rest as { width?: number }).width}
      height={(rest as { height?: number }).height}
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
      quality={quality}
      {...rest}
    />
  );
}
