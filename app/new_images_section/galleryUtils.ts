import path from "node:path";
import fs from "node:fs/promises";

export interface GalleryImage {
  src: string;
  alt: string;
  folder: string;
  caption?: string;
}

const IMG_EXT = /\.(jpe?g|png|webp|avif)$/i;

function titleFromFilename(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ").trim().replace(/\b\p{L}/gu, (m) => m.toUpperCase());
}

async function readFolder(root: string, folderName: string): Promise<GalleryImage[]> {
  const dir = path.join(root, folderName);
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && IMG_EXT.test(e.name))
      .map((e) => {
        const caption = titleFromFilename(e.name);
        return {
          src: `/images/${folderName}/${e.name}`,
          alt: caption,
          caption,
          folder: folderName,
        } satisfies GalleryImage;
      });
  } catch {
    return [];
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const root = path.join(process.cwd(), "public", "images");
  let folders: string[] = [];
  
  try {
    const entries = await fs.readdir(root, { withFileTypes: true });
    folders = entries
      .filter((e) => e.isDirectory() && e.name !== "directly_useful")
      .map((e) => e.name);
  } catch {
    return [];
  }
  
  const perFolder = await Promise.all(folders.map((f) => readFolder(root, f)));
  return perFolder.flat().sort((a, b) => a.src.localeCompare(b.src));
}