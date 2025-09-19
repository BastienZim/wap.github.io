import { getGalleryImages } from "./galleryUtils";
import GalleryClientPage from "./GalleryClientPage";

export const runtime = "nodejs";

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages().catch(() => []);
  return <GalleryClientPage images={galleryImages} />;
}
