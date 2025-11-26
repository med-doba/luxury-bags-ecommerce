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
      const products = await prisma.product.findMany({
        include: {
          category: true,
          colorVariants: {
            include: {
              images: true,
              sizeVariants: true,
            },
          },
          // Legacy support
          sizeVariants: true,
          images: true,
        },
      });
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: `Error fetching products ${error}` });
    }
  } else if (req.method === "POST") {
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

          // Extract basic product fields
          const name = (fields.name?.[0] as string) || "";
          const price = Number.parseFloat((fields.price?.[0] as string) || "0");
          const categoryId = (fields.categoryId?.[0] as string) || "";
          const size = (fields.size?.[0] as string) || "";
          const description = (fields.description?.[0] as string) || "";
          const featured = fields.featured?.[0] === "true";
          const stock = Number.parseInt((fields.stock?.[0] as string) || "0");

          // Handle main product image
          let imageUrl = (fields.imageUrl?.[0] as string) || "";

          if (files.mainImage) {
            const mainImageFile = Array.isArray(files.mainImage)
              ? files.mainImage[0]
              : files.mainImage;

            if (mainImageFile && mainImageFile.filepath) {
              const imageName = `product-main-${Date.now()}-${
                mainImageFile.originalFilename || "image.jpg"
              }`;
              const imagePath = path.join(uploadsDir, imageName);

              try {
                const fileContent = await readFile(mainImageFile.filepath);
                await writeFile(imagePath, fileContent);
                imageUrl = `/uploads/products/${imageName}`;
              } catch (error) {
                console.error("Error processing main image file:", error);
              }
            }
          }

          // Create the product (now with optional color)
          const newProduct = await prisma.product.create({
            data: {
              name,
              price,
              imageUrl,
              category: categoryId
                ? { connect: { id: categoryId } }
                : undefined,
              size,
              description,
              featured,
              stock,
              color: "", // Temporary - we'll remove this field eventually
            },
          });

          // Parse color variants data
          const colorVariantsData = fields.colorVariants?.[0]
            ? JSON.parse(fields.colorVariants[0] as string)
            : [];

          // Create color variants with their size variants and handle images
          for (const variantData of colorVariantsData) {
            const colorVariant = await prisma.colorVariant.create({
              data: {
                color: variantData.color,
                stock: variantData.stock || 0,
                productId: newProduct.id,
              },
            });

            // Create size variants for this color
            if (
              variantData.sizeVariants &&
              variantData.sizeVariants.length > 0
            ) {
              for (const sizeData of variantData.sizeVariants) {
                await prisma.colorSizeVariant.create({
                  data: {
                    size: sizeData.size,
                    stock: sizeData.stock || 0,
                    price: sizeData.price ? Number(sizeData.price) : null,
                    colorVariantId: colorVariant.id,
                  },
                });
              }
            }

            // Handle images for this color variant
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

                    await prisma.colorVariantImage.create({
                      data: {
                        url: `/uploads/products/${imageName}`,
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

          // Fetch the complete product with all relations
          const completeProduct = await prisma.product.findUnique({
            where: { id: newProduct.id },
            include: {
              category: true,
              colorVariants: {
                include: {
                  images: true,
                  sizeVariants: true,
                },
              },
              sizeVariants: true,
            },
          });

          res.status(201).json(completeProduct);
        } catch (error) {
          console.error("Error creating product:", error);
          res.status(500).json({ error: "Error creating product" });
        }
      });
    } catch (error) {
      console.error("Error in POST handler:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
