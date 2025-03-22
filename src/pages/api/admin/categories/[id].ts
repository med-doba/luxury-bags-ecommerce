// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { IncomingForm } from "formidable";
// import { writeFile, readFile, mkdir } from "fs/promises";
// import path from "path";
// import { existsSync } from "fs";

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

//   if (req.method === "DELETE") {
//     try {
//       // Instead of returning an error, update all associated products to have null category
//       await prisma.product.updateMany({
//         where: {
//           categoryId: String(id),
//         },
//         data: {
//           categoryId: null,
//         },
//       });

//       // Then delete the category
//       await prisma.category.delete({
//         where: {
//           id: String(id),
//         },
//       });

//       return res.status(204).end();
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       return res.status(500).json({
//         error: "Failed to delete category",
//         details: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   } else if (req.method === "PUT") {
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
//   } else {
//     res.setHeader("Allow", ["PUT", "DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { IncomingForm } from "formidable";
// import { writeFile, readFile, mkdir } from "fs/promises";
// import path from "path";
// import { existsSync } from "fs";

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

//   if (!id || typeof id !== "string") {
//     return res.status(400).json({ error: "Invalid category ID" });
//   }

//   if (req.method === "DELETE") {
//     try {
//       // Check if category exists
//       const category = await prisma.category.findUnique({
//         where: { id: String(id) },
//       });

//       if (!category) {
//         return res.status(404).json({ error: "Category not found" });
//       }

//       // Update all associated products to have null category
//       await prisma.product.updateMany({
//         where: {
//           categoryId: String(id),
//         },
//         data: {
//           categoryId: null,
//         },
//       });

//       // Then delete the category
//       await prisma.category.delete({
//         where: {
//           id: String(id),
//         },
//       });

//       return res.status(204).end();
//     } catch (error) {
//       console.error(
//         "Error deleting category:",
//         error instanceof Error ? error.message : "Unknown error"
//       );
//       return res.status(500).json({
//         error: "Failed to delete category",
//         details: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   } else if (req.method === "PUT") {
//     return new Promise((resolve) => {
//       const form = new IncomingForm({
//         keepExtensions: true,
//       });

//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           console.error(
//             "Error parsing form:",
//             err instanceof Error ? err.message : "Unknown error"
//           );
//           res.status(500).json({ error: "Error parsing form data" });
//           return resolve(undefined);
//         }

//         try {
//           // Ensure uploads directory exists
//           const uploadsDir = path.join(
//             process.cwd(),
//             "public",
//             "uploads",
//             "categories"
//           );
//           if (!existsSync(uploadsDir)) {
//             await mkdir(uploadsDir, { recursive: true });
//           }

//           const name = (fields.name?.[0] as string) || "";

//           // Handle image (either from file upload or URL)
//           let imageUrl = (fields.imageUrl?.[0] as string) || "";

//           // If an image file was uploaded, process it
//           if (files.imageFile) {
//             // Handle single file
//             const imageFile = Array.isArray(files.imageFile)
//               ? files.imageFile[0]
//               : files.imageFile;

//             if (imageFile && imageFile.filepath) {
//               const imageName = `category-${Date.now()}-${
//                 imageFile.originalFilename || "image.jpg"
//               }`;
//               const imagePath = path.join(uploadsDir, imageName);

//               // Read the file content and write it to the new location
//               const fileContent = await readFile(imageFile.filepath);
//               await writeFile(imagePath, fileContent);

//               // Set the image URL to the uploaded file path
//               imageUrl = `/uploads/categories/${imageName}`;
//             }
//           }

//           // Prepare update data
//           const updateData: any = { name };
//           if (imageUrl) {
//             updateData.imageUrl = imageUrl;
//           }

//           // Update the category
//           const updatedCategory = await prisma.category.update({
//             where: { id: String(id) },
//             data: updateData,
//           });

//           res.status(200).json(updatedCategory);
//         } catch (error) {
//           // Safely log the error without passing null
//           console.error(
//             "Error in category update:",
//             error instanceof Error ? error.message : "Unknown error"
//           );
//           res.status(500).json({ error: "Error updating category" });
//         }

//         return resolve(undefined);
//       });
//     });
//   } else {
//     res.setHeader("Allow", ["PUT", "DELETE"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
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

// Maximum length for imageUrl to prevent database errors
const MAX_URL_LENGTH = 255;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  if (req.method === "DELETE") {
    try {
      // Check if category exists
      const category = await prisma.category.findUnique({
        where: { id: String(id) },
      });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Update all associated products to have null category
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
      console.error(
        "Error deleting category:",
        error instanceof Error ? error.message : "Unknown error"
      );
      return res.status(500).json({
        error: "Failed to delete category",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else if (req.method === "PUT") {
    return new Promise((resolve) => {
      const form = new IncomingForm({
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(
            "Error parsing form:",
            err instanceof Error ? err.message : "Unknown error"
          );
          res.status(500).json({ error: "Error parsing form data" });
          return resolve(undefined);
        }

        try {
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
              // Create a shorter filename to avoid URL length issues
              const fileExt = path.extname(
                imageFile.originalFilename || ".jpg"
              );
              const timestamp = Date.now().toString().slice(-6); // Use last 6 digits only
              const imageName = `cat-${timestamp}${fileExt}`;
              const imagePath = path.join(uploadsDir, imageName);

              // Read the file content and write it to the new location
              const fileContent = await readFile(imageFile.filepath);
              await writeFile(imagePath, fileContent);

              // Set the image URL to the uploaded file path (shorter path)
              imageUrl = `/uploads/categories/${imageName}`;
            }
          }

          // Ensure imageUrl is not too long for the database
          if (imageUrl.length > MAX_URL_LENGTH) {
            console.warn(
              `Image URL too long (${imageUrl.length} chars), truncating to ${MAX_URL_LENGTH} chars`
            );
            imageUrl = imageUrl.substring(0, MAX_URL_LENGTH);
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
        } catch (error) {
          // Log the detailed error for debugging
          console.error(
            "Error in category update:",
            error instanceof Error ? error.message : "Unknown error"
          );

          // Check for specific database constraint errors
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          if (errorMessage.includes("too long for the column")) {
            res.status(400).json({
              error:
                "Image URL is too long. Please use a shorter image URL or upload a smaller image.",
            });
          } else {
            res.status(500).json({ error: "Error updating category" });
          }
        }

        return resolve(undefined);
      });
    });
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
