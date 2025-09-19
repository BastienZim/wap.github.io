// components/ui/BaseImage.tsx
import React from "react";
import { basePath } from "@/lib/basePath";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

export default function BaseImage({ src, ...props }: Props) {
  return <img src={basePath(src)} {...props} />;
}
