import { NextResponse } from "next/server";
import { getGalleryImages } from "../../new_images_section/galleryUtils";

// With `output: 'export'` every Route Handler must be statically renderable.
// We force static evaluation at build time so the filesystem is read once
// and the result is emitted as a static JSON file (no server needed at runtime).
export const dynamic = "force-static"; // alternatively: export const revalidate = false;
// export const runtime = 'nodejs'; // (optional) explicit runtime if you later mix edge routes.

export async function GET() {
  try {
    // Use the improved gallery image retrieval
    const images = await getGalleryImages();
    
    // Return clear debug info if no images found
    if (images.length === 0) {
      console.log("No gallery images found - check public/images directory");
      return NextResponse.json({
        images: [],
        debug: {
          message: "No images found in public/images",
          cwd: process.cwd(),
          publicImagesPath: process.cwd() + "/public/images",
        }
      });
    }
    
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json({ 
      error: "Failed to fetch gallery images",
      message: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}