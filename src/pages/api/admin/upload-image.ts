import type { NextApiRequest, NextApiResponse } from "next";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";
import { IncomingForm } from "formidable";
import { existsSync } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const form = new IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing form data" });
      }

      try {
        // Ensure uploads directory exists
        const uploadsDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "products"
        );
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true });
        }

        const uploadedImages: string[] = [];

        // Handle multiple files
        const imageFiles = files.images;
        if (!imageFiles) {
          return res.status(400).json({ error: "No images provided" });
        }

        const fileArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

        for (const imageFile of fileArray) {
          if (imageFile && imageFile.filepath) {
            const imageName = `image-${Date.now()}-${Math.random()
              .toString(36)
              .substring(7)}-${imageFile.originalFilename || "image.jpg"}`;
            const imagePath = path.join(uploadsDir, imageName);

            try {
              const fileContent = await readFile(imageFile.filepath);
              await writeFile(imagePath, fileContent);
              uploadedImages.push(`/uploads/products/${imageName}`);
            } catch (error) {
              console.error("Error processing image file:", error);
            }
          }
        }

        res.status(200).json({ imageUrls: uploadedImages });
      } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ error: "Error uploading images" });
      }
    });
  } catch (error) {
    console.error("Error in upload handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
