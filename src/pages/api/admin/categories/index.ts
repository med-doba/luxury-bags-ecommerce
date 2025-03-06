// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const categories = await prisma.category.findMany({
//         include: { products: true },
//       });
//       res.status(200).json(categories);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching categories" });
//     }
//   } else if (req.method === "POST") {
//     try {
//       const newCategory = await prisma.category.create({
//         data: req.body,
//       });
//       res.status(201).json(newCategory);
//     } catch (error) {
//       res.status(500).json({ error: "Error creating category" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
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
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany({
        include: { products: true },
      });
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Error fetching categories" });
    }
  } else if (req.method === "POST") {
    try {
      const form = new IncomingForm({
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).json({ error: "Error parsing form data" });
        }

        // Ensure uploads directory exists
        const uploadsDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "categories"
        );
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true });
        }

        const name = (fields.name?.[0] as string) || "";

        // Handle image (either from file upload or URL)
        let imageUrl = (fields.imageUrl?.[0] as string) || "";

        // If an image file was uploaded, process it
        if (files.imageFile) {
          // Handle single file
          const imageFile = Array.isArray(files.imageFile)
            ? files.imageFile[0]
            : files.imageFile;

          if (imageFile && imageFile.filepath) {
            const imageName = `category-${Date.now()}-${
              imageFile.originalFilename || "image.jpg"
            }`;
            const imagePath = path.join(uploadsDir, imageName);

            try {
              // Read the file content and write it to the new location
              const fileContent = await readFile(imageFile.filepath);
              await writeFile(imagePath, fileContent);

              // Set the image URL to the uploaded file path
              imageUrl = `/uploads/categories/${imageName}`;
            } catch (error) {
              console.error("Error processing image file:", error);
              return res
                .status(500)
                .json({ error: "Error processing image file" });
            }
          }
        }

        // Create the category
        const newCategory = await prisma.category.create({
          data: {
            name,
            imageUrl,
          },
        });

        res.status(201).json(newCategory);
      });
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Error creating category" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
