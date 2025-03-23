// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   if (req.method === "DELETE") {
//     try {
//       // First, delete all related product images
//       await prisma.productImage.deleteMany({
//         where: {
//           productId: String(id),
//         },
//       });

//       // Then delete the product itself
//       await prisma.product.delete({
//         where: {
//           id: String(id),
//         },
//       });

//       return res.status(204).end();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       return res.status(500).json({
//         error: "Failed to delete product",
//         details: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const data = req.body;

//       const updatedProduct = await prisma.product.update({
//         where: {
//           id: String(id),
//         },
//         data,
//       });

//       return res.status(200).json(updatedProduct);
//     } catch (error) {
//       console.error("Error updating product:", error);
//       return res.status(500).json({
//         error: "Failed to update product",
//         details: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   } else {
//     res.setHeader("Allow", ["DELETE", "PUT"]);
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      // First, delete all related product images
      await prisma.productImage.deleteMany({
        where: {
          productId: String(id),
        },
      });

      // Then delete the product itself
      await prisma.product.delete({
        where: {
          id: String(id),
        },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({
        error: "Failed to delete product",
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
          "products"
        );
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true });
        }

        // Extract fields
        const name = (fields.name?.[0] as string) || "";
        const price = Number.parseFloat((fields.price?.[0] as string) || "0");
        const categoryId = (fields.categoryId?.[0] as string) || null;
        const color = (fields.color?.[0] as string) || "";
        const size = (fields.size?.[0] as string) || "";
        const description = (fields.description?.[0] as string) || "";
        const featured = (fields.featured?.[0] as string) === "true";

        // Add this line to extract the stock field
        const stock = Number.parseInt((fields.stock?.[0] as string) || "5");

        // Handle image URL or file
        let imageUrl = (fields.imageUrl?.[0] as string) || "";

        // If a main image file was uploaded, process it
        if (files.mainImage) {
          const mainImage = Array.isArray(files.mainImage)
            ? files.mainImage[0]
            : files.mainImage;

          if (mainImage && mainImage.filepath) {
            const imageName = `product-${Date.now()}-${
              mainImage.originalFilename || "image.jpg"
            }`;
            const imagePath = path.join(uploadsDir, imageName);

            try {
              const fileContent = await readFile(mainImage.filepath);
              await writeFile(imagePath, fileContent);
              imageUrl = `/uploads/products/${imageName}`;
            } catch (error) {
              console.error("Error processing main image file:", error);
              return res
                .status(500)
                .json({ error: "Error processing main image file" });
            }
          }
        }

        // Prepare update data
        const updateData: any = {
          name,
          price,
          color,
          size,
          description,
          featured,
          stock, // Add this line to include the stock field
        };

        // Only update imageUrl if it's provided
        if (imageUrl) {
          updateData.imageUrl = imageUrl;
        }

        // Only update categoryId if it's provided
        if (categoryId) {
          updateData.categoryId = categoryId;
        } else {
          updateData.categoryId = null;
        }

        // Update the product
        const updatedProduct = await prisma.product.update({
          where: {
            id: String(id),
          },
          data: updateData,
          include: {
            category: true,
            images: true,
          },
        });

        // Handle additional images
        if (files.additionalImages) {
          const additionalImages = Array.isArray(files.additionalImages)
            ? files.additionalImages
            : [files.additionalImages];

          for (const image of additionalImages) {
            if (image && image.filepath) {
              const imageName = `product-additional-${Date.now()}-${
                image.originalFilename || "image.jpg"
              }`;
              const imagePath = path.join(uploadsDir, imageName);

              try {
                const fileContent = await readFile(image.filepath);
                await writeFile(imagePath, fileContent);

                // Create a new product image
                await prisma.productImage.create({
                  data: {
                    url: `/uploads/products/${imageName}`,
                    productId: String(id),
                  },
                });
              } catch (error) {
                console.error("Error processing additional image file:", error);
                // Continue with other images even if one fails
              }
            }
          }
        }

        // Handle image IDs to keep
        if (fields.imageIdsToKeep && fields.imageIdsToKeep[0]) {
          try {
            const imageIdsToKeep = JSON.parse(
              fields.imageIdsToKeep[0] as string
            );

            // Delete images that are not in the keep list
            await prisma.productImage.deleteMany({
              where: {
                productId: String(id),
                id: {
                  notIn: imageIdsToKeep,
                },
              },
            });
          } catch (error) {
            console.error("Error processing image IDs to keep:", error);
          }
        }

        // Fetch the updated product with all relations
        const finalProduct = await prisma.product.findUnique({
          where: {
            id: String(id),
          },
          include: {
            category: true,
            images: true,
          },
        });

        return res.status(200).json(finalProduct);
      });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({
        error: "Failed to update product",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
