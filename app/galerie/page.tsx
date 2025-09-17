import path from "node:path";
import fs from "node:fs/promises";
import GalleryClient from "./GalleryClient";
import type { Photo } from "./types";

export const runtime = "nodejs";


const IMG_EXT = /\.(jpe?g|png|webp|avif)$/i;

function titleFromFilename(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ").trim().replace(/\b\p{L}/gu, (m) => m.toUpperCase());
}

async function readCategory(root: string, cat: string): Promise<Photo[]> {
  const dir = path.join(root, cat);
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && IMG_EXT.test(e.name))
      .map((e) => {
        const caption = titleFromFilename(e.name);
        return {
          src: `/images/${cat}/${e.name}`,
          alt: caption,
          caption,
          category: cat, // <- use folder name as category
        } satisfies Photo;
      });
  } catch {
    return [];
  }
}

async function getPhotosFromPublic(): Promise<Photo[]> {
  const root = path.join(process.cwd(), "public", "images");
  let cats: string[] = [];
  try {
    const entries = await fs.readdir(root, { withFileTypes: true });
    cats = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
  const perCat = await Promise.all(cats.map((c) => readCategory(root, c)));
  return perCat.flat().sort((a, b) => a.src.localeCompare(b.src));
}

export default async function Page() {
  const photos = await getPhotosFromPublic().catch(() => []);
  return <GalleryClient photos={photos} />;
}