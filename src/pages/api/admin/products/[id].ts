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
      // Delete all related color variant images first
      await (prisma as any).colorVariantImage.deleteMany({
        where: {
          colorVariant: {
            productId: String(id),
          },
        },
      });

      // Delete all color size variants
      await (prisma as any).colorSizeVariant.deleteMany({
        where: {
          colorVariant: {
            productId: String(id),
          },
        },
      });

      // Delete all color variants
      await (prisma as any).colorVariant.deleteMany({
        where: {
          productId: String(id),
        },
      });

      // Delete all related product images
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
        multiples: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).json({ error: "Error parsing form data" });
        }

        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true });
        }

        // Extract fields
        const name = (fields.name?.[0] as string) || "";
        const categoryId = (fields.categoryId?.[0] as string) || null;
        const description = (fields.description?.[0] as string) || "";
        const featured = (fields.featured?.[0] as string) === "true";

        // Sale fields
        const onSale = (fields.onSale?.[0] as string) === "true";
        const salePercentage = onSale
          ? Number.parseInt((fields.salePercentage?.[0] as string) || "0")
          : null;

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
              imageUrl = `/uploads/${imageName}`;
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
          description,
          featured,
          onSale,
          salePercentage,
          price: 0, // Always 0 since we use variants for pricing
        };

        // Only update imageUrl if it's provided
        if (imageUrl) {
          updateData.imageUrl = imageUrl;
        }

        // Only update categoryId if it's provided
        if (categoryId) {
          updateData.categoryId = categoryId;
        }

        // Update the product
        const updatedProduct = await prisma.product.update({
          where: {
            id: String(id),
          },
          data: updateData,
        });

        // Handle color variants update
        const colorVariantsData = fields.colorVariants?.[0]
          ? JSON.parse(fields.colorVariants[0] as string)
          : [];

        // Delete existing color variants and their relations
        await (prisma as any).colorVariantImage.deleteMany({
          where: {
            colorVariant: {
              productId: String(id),
            },
          },
        });

        await (prisma as any).colorSizeVariant.deleteMany({
          where: {
            colorVariant: {
              productId: String(id),
            },
          },
        });

        await (prisma as any).colorVariant.deleteMany({
          where: {
            productId: String(id),
          },
        });

        // Create new color variants
        for (const variantData of colorVariantsData) {
          // Create color variant
          const colorVariant = await (prisma as any).colorVariant.create({
            data: {
              color: variantData.color,
              colorHex: variantData.colorHex || null,
              stock: variantData.stock || 0,
              productId: String(id),
            },
          });

          // Create size variants for this color
          if (variantData.sizeVariants && variantData.sizeVariants.length > 0) {
            for (const sizeData of variantData.sizeVariants) {
              await (prisma as any).colorSizeVariant.create({
                data: {
                  size: sizeData.size,
                  stock: sizeData.stock || 0,
                  price: sizeData.price ? Number(sizeData.price) : null,
                  colorVariantId: colorVariant.id,
                },
              });
            }
          }

          // Handle existing images for this color variant
          if (variantData.images && variantData.images.length > 0) {
            for (const imageData of variantData.images) {
              if (imageData.isExisting && imageData.url) {
                // Keep existing image
                await (prisma as any).colorVariantImage.create({
                  data: {
                    url: imageData.url,
                    colorVariantId: colorVariant.id,
                  },
                });
              }
            }
          }

          // Handle new images for this color variant
          const colorFileKey = `colorImages_${variantData.color}`;
          const colorImages = files[colorFileKey];

          if (colorImages) {
            const imageFiles = Array.isArray(colorImages)
              ? colorImages
              : [colorImages];

            for (const imageFile of imageFiles) {
              if (imageFile && imageFile.filepath) {
                const imageName = `color-${variantData.color}-${Date.now()}-${
                  imageFile.originalFilename || "image.jpg"
                }`;
                const imagePath = path.join(uploadsDir, imageName);

                try {
                  const fileContent = await readFile(imageFile.filepath);
                  await writeFile(imagePath, fileContent);

                  await (prisma as any).colorVariantImage.create({
                    data: {
                      url: `/uploads/${imageName}`,
                      colorVariantId: colorVariant.id,
                    },
                  });
                } catch (error) {
                  console.error(
                    `Error processing image for color ${variantData.color}:`,
                    error
                  );
                }
              }
            }
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
            colorVariants: {
              include: {
                images: true,
                sizeVariants: true,
              },
            },
            sizeVariants: true,
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
