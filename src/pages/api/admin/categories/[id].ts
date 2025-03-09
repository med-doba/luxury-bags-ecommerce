// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { writeFile, readFile, mkdir } from "fs/promises";
// import path from "path";
// import { IncomingForm } from "formidable";
// import { existsSync } from "fs";
// import { Prisma } from "@prisma/client";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   if (req.method === "PUT") {
//     try {
//       const form = new IncomingForm({
//         keepExtensions: true,
//       });

//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           return res.status(500).json({ error: "Error parsing form data" });
//         }

//         // Ensure uploads directory exists
//         const uploadsDir = path.join(
//           process.cwd(),
//           "public",
//           "uploads",
//           "categories"
//         );
//         if (!existsSync(uploadsDir)) {
//           await mkdir(uploadsDir, { recursive: true });
//         }

//         const name = (fields.name?.[0] as string) || "";

//         // Handle image (either from file upload or URL)
//         let imageUrl = (fields.imageUrl?.[0] as string) || "";

//         // If an image file was uploaded, process it
//         if (files.imageFile) {
//           // Handle single file
//           const imageFile = Array.isArray(files.imageFile)
//             ? files.imageFile[0]
//             : files.imageFile;

//           if (imageFile && imageFile.filepath) {
//             const imageName = `category-${Date.now()}-${
//               imageFile.originalFilename || "image.jpg"
//             }`;
//             const imagePath = path.join(uploadsDir, imageName);

//             try {
//               // Read the file content and write it to the new location
//               const fileContent = await readFile(imageFile.filepath);
//               await writeFile(imagePath, fileContent);

//               // Set the image URL to the uploaded file path
//               imageUrl = `/uploads/categories/${imageName}`;
//             } catch (error) {
//               console.error("Error processing image file:", error);
//               return res
//                 .status(500)
//                 .json({ error: "Error processing image file" });
//             }
//           }
//         }

//         // Prepare update data
//         const updateData: any = { name };
//         if (imageUrl) {
//           updateData.imageUrl = imageUrl;
//         }

//         // Update the category
//         const updatedCategory = await prisma.category.update({
//           where: { id: String(id) },
//           data: updateData,
//         });

//         res.status(200).json(updatedCategory);
//       });
//     } catch (error) {
//       console.error("Error updating category:", error);
//       res.status(500).json({ error: "Error updating category" });
//     }
//   } else if (req.method === "DELETE") {
//     try {
//       // First, check if the category has any associated products
//       const category = await prisma.category.findUnique({
//         where: { id: String(id) },
//         include: { products: true },
//       });

//       if (!category) {
//         return res.status(404).json({ error: "Category not found" });
//       }

//       // If the category has associated products, return an error
//       if (category.products && category.products.length > 0) {
//         return res.status(400).json({
//           error:
//             "Cannot delete category with associated products. Remove the products first or reassign them to another category.",
//         });
//       }

//       // If no associated products, proceed with deletion
//       await prisma.category.delete({
//         where: { id: String(id) },
//       });

//       res.status(204).end();
//     } catch (error) {
//       console.error("Error deleting category:", error);

//       // Check for specific Prisma errors
//       if (error instanceof Prisma.PrismaClientKnownRequestError) {
//         // Foreign key constraint error
//         if (error.code === "P2003") {
//           return res.status(400).json({
//             error:
//               "Cannot delete this category because it is referenced by other records in the database.",
//           });
//         }
//       }

//       res.status(500).json({ error: "Error deleting category" });
//     }
//   } else {
//     res.setHeader("Allow", ["PUT", "DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { IncomingForm } from "formidable";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";
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
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      // Instead of returning an error, update all associated products to have null category
      await prisma.product.updateMany({
        where: {
          categoryId: String(id),
        },
        data: {
          categoryId: null,
        },
      });

      // Then delete the category
      await prisma.category.delete({
        where: {
          id: String(id),
        },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting category:", error);
      return res.status(500).json({
        error: "Failed to delete category",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else if (req.method === "PUT") {
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

        // Prepare update data
        const updateData: any = { name };
        if (imageUrl) {
          updateData.imageUrl = imageUrl;
        }

        // Update the category
        const updatedCategory = await prisma.category.update({
          where: { id: String(id) },
          data: updateData,
        });

        res.status(200).json(updatedCategory);
      });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Error updating category" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
