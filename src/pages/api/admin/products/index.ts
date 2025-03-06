// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   //   console.log("req : ", req);
//   if (req.method === "GET") {
//     try {
//       const products = await prisma.product.findMany();
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching products" });
//     }
//   } else if (req.method === "POST") {
//     try {
//       console.log("newProduct === ", req.body);
//       const newProduct = await prisma.product.create({
//         data: req.body,
//       });
//       res.status(201).json(newProduct);
//     } catch (error) {
//       //   console.log("error === ", error);
//       res.status(500).json({ error: "Error creating product" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const products = await prisma.product.findMany({
//         include: { category: true },
//       });
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching products" });
//     }
//   } else if (req.method === "POST") {
//     try {
//       const { categoryId, ...productData } = req.body;
//       const newProduct = await prisma.product.create({
//         data: {
//           ...productData,
//           category: { connect: { id: categoryId } },
//         },
//         include: { category: true },
//       });
//       res.status(201).json(newProduct);
//     } catch (error) {
//       res.status(500).json({ error: "Error creating product" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { IncomingForm } from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const products = await prisma.product.findMany({
//         include: { category: true, images: true },
//       });
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching products" });
//     }
//   } else if (req.method === "POST") {
//     const form = new IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ error: "Error parsing form data" });
//       }

//       try {
//         const {
//           name,
//           price,
//           imageUrl,
//           categoryId,
//           color,
//           size,
//           description,
//           featured,
//         } = fields;

//         const newProduct = await prisma.product.create({
//           data: {
//             name: name as string,
//             price: Number.parseFloat(price as string),
//             imageUrl: imageUrl as string,
//             category: { connect: { id: categoryId as string } },
//             color: color as string,
//             size: size as string,
//             description: description as string,
//             featured: featured === "true",
//           },
//           include: { category: true },
//         });

//         // Handle additional images
//         const imageFiles = Object.values(files).filter((file) =>
//           Array.isArray(file)
//             ? file[0].mimetype?.startsWith("image/")
//             : file.mimetype?.startsWith("image/")
//         );
//         for (const file of imageFiles) {
//           const imageFile = Array.isArray(file) ? file[0] : file;
//           const imageBuffer = fs.readFileSync(imageFile.filepath);
//           const imageName = `${Date.now()}-${imageFile.originalFilename}`;
//           const imagePath = path.join(
//             process.cwd(),
//             "public",
//             "uploads",
//             imageName
//           );

//           fs.writeFileSync(imagePath, imageBuffer);

//           await prisma.productImage.create({
//             data: {
//               url: `/uploads/${imageName}`,
//               productId: newProduct.id,
//             },
//           });
//         }

//         const updatedProduct = await prisma.product.findUnique({
//           where: { id: newProduct.id },
//           include: { category: true, images: true },
//         });

//         res.status(201).json(updatedProduct);
//       } catch (error) {
//         res.status(500).json({ error: "Error creating product" });
//       }
//     });
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { writeFile } from "fs/promises";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const products = await prisma.product.findMany({
//         include: { category: true, images: true },
//       });
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching products" });
//     }
//   } else if (req.method === "POST") {
//     try {
//       const formData = await req.formData();

//       const name = formData.get("name") as string;
//       const price = Number.parseFloat(formData.get("price") as string);
//       const imageUrl = formData.get("imageUrl") as string;
//       const categoryId = formData.get("categoryId") as string;
//       const color = formData.get("color") as string;
//       const size = formData.get("size") as string;
//       const description = formData.get("description") as string;
//       const featured = formData.get("featured") === "true";

//       const newProduct = await prisma.product.create({
//         data: {
//           name,
//           price,
//           imageUrl,
//           category: { connect: { id: categoryId } },
//           color,
//           size,
//           description,
//           featured,
//         },
//         include: { category: true },
//       });

//       // Handle additional images
//       const imageFiles = formData.getAll("images") as File[];
//       for (const file of imageFiles) {
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         const imageName = `${Date.now()}-${file.name}`;
//         const imagePath = path.join(
//           process.cwd(),
//           "public",
//           "uploads",
//           imageName
//         );

//         await writeFile(imagePath, buffer);

//         await prisma.productImage.create({
//           data: {
//             url: `/uploads/${imageName}`,
//             productId: newProduct.id,
//           },
//         });
//       }

//       const updatedProduct = await prisma.product.findUnique({
//         where: { id: newProduct.id },
//         include: { category: true, images: true },
//       });

//       res.status(201).json(updatedProduct);
//     } catch (error) {
//       console.error("Error creating product:", error);
//       res.status(500).json({ error: "Error creating product" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { writeFile } from "fs/promises";
// import path from "path";
// import { IncomingForm, type File } from "formidable";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const products = await prisma.product.findMany({
//         include: { category: true, images: true },
//       });
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching products" });
//     }
//   } else if (req.method === "POST") {
//     try {
//       const form = new IncomingForm();
//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           return res.status(500).json({ error: "Error parsing form data" });
//         }

//         const name = fields.name[0] as string;
//         const price = Number.parseFloat(fields.price[0] as string);
//         const imageUrl = fields.imageUrl[0] as string;
//         const categoryId = fields.categoryId[0] as string;
//         const color = fields.color[0] as string;
//         const size = fields.size[0] as string;
//         const description = fields.description[0] as string;
//         const featured = fields.featured[0] === "true";

//         const newProduct = await prisma.product.create({
//           data: {
//             name,
//             price,
//             imageUrl,
//             category: { connect: { id: categoryId } },
//             color,
//             size,
//             description,
//             featured,
//           },
//           include: { category: true },
//         });

//         // Handle additional images
//         const imageFiles = files.images as File[];
//         if (Array.isArray(imageFiles)) {
//           for (const file of imageFiles) {
//             const imageName = `${Date.now()}-${file.originalFilename}`;
//             const imagePath = path.join(
//               process.cwd(),
//               "public",
//               "uploads",
//               imageName
//             );

//             await writeFile(imagePath, await file.arrayBuffer());

//             await prisma.productImage.create({
//               data: {
//                 url: `/uploads/${imageName}`,
//                 productId: newProduct.id,
//               },
//             });
//           }
//         }

//         const updatedProduct = await prisma.product.findUnique({
//           where: { id: newProduct.id },
//           include: { category: true, images: true },
//         });

//         res.status(201).json(updatedProduct);
//       });
//     } catch (error) {
//       console.error("Error creating product:", error);
//       res.status(500).json({ error: "Error creating product" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { writeFile, readFile } from "fs/promises";
// import path from "path";
// import { IncomingForm, type File } from "formidable";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const products = await prisma.product.findMany({
//         include: { category: true, images: true },
//       });
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching products" });
//     }
//   } else if (req.method === "POST") {
//     try {
//       const form = new IncomingForm();
//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           return res.status(500).json({ error: "Error parsing form data" });
//         }

//         const name = fields.name[0] as string;
//         const price = Number.parseFloat(fields.price[0] as string);
//         const imageUrl = fields.imageUrl[0] as string;
//         const categoryId = fields.categoryId[0] as string;
//         const color = fields.color[0] as string;
//         const size = fields.size[0] as string;
//         const description = fields.description[0] as string;
//         const featured = fields.featured[0] === "true";

//         const newProduct = await prisma.product.create({
//           data: {
//             name,
//             price,
//             imageUrl,
//             category: { connect: { id: categoryId } },
//             color,
//             size,
//             description,
//             featured,
//           },
//           include: { category: true },
//         });

//         // Handle additional images
//         const imageFiles = files.images as File[];
//         if (Array.isArray(imageFiles)) {
//           for (const file of imageFiles) {
//             const imageName = `${Date.now()}-${file.originalFilename}`;
//             const imagePath = path.join(
//               process.cwd(),
//               "public",
//               "uploads",
//               imageName
//             );

//             // Read the file content and write it to the new location
//             const fileContent = await readFile(file.filepath);
//             await writeFile(imagePath, fileContent);

//             await prisma.productImage.create({
//               data: {
//                 url: `/uploads/${imageName}`,
//                 productId: newProduct.id,
//               },
//             });
//           }
//         }

//         const updatedProduct = await prisma.product.findUnique({
//           where: { id: newProduct.id },
//           include: { category: true, images: true },
//         });

//         res.status(201).json(updatedProduct);
//       });
//     } catch (error) {
//       console.error("Error creating product:", error);
//       res.status(500).json({ error: "Error creating product" });
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
      const products = await prisma.product.findMany({
        include: { category: true, images: true },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
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

        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true });
        }

        const name = (fields.name?.[0] as string) || "";
        const price = Number.parseFloat((fields.price?.[0] as string) || "0");
        const categoryId = (fields.categoryId?.[0] as string) || "";
        const color = (fields.color?.[0] as string) || "";
        const size = (fields.size?.[0] as string) || "";
        const description = (fields.description?.[0] as string) || "";
        const featured = fields.featured?.[0] === "true";

        // Handle main image (either from file upload or URL)
        let imageUrl = (fields.imageUrl?.[0] as string) || "";

        // If a main image file was uploaded, process it
        if (files.mainImage) {
          // Handle single file
          const mainImageFile = Array.isArray(files.mainImage)
            ? files.mainImage[0]
            : files.mainImage;

          if (mainImageFile && mainImageFile.filepath) {
            const imageName = `product-${Date.now()}-${
              mainImageFile.originalFilename || "image.jpg"
            }`;
            const imagePath = path.join(uploadsDir, imageName);

            try {
              // Read the file content and write it to the new location
              const fileContent = await readFile(mainImageFile.filepath);
              await writeFile(imagePath, fileContent);

              // Set the image URL to the uploaded file path
              imageUrl = `/uploads/${imageName}`;
            } catch (error) {
              console.error("Error processing main image file:", error);
            }
          }
        }

        // Create the product
        const newProduct = await prisma.product.create({
          data: {
            name,
            price,
            imageUrl,
            category: { connect: { id: categoryId } },
            color,
            size,
            description,
            featured,
          },
          include: { category: true },
        });

        // Handle additional images
        if (files.additionalImages) {
          const additionalImageFiles = Array.isArray(files.additionalImages)
            ? files.additionalImages
            : [files.additionalImages];

          for (const file of additionalImageFiles) {
            if (file && file.filepath) {
              const imageName = `product-${newProduct.id}-${Date.now()}-${
                file.originalFilename || "image.jpg"
              }`;
              const imagePath = path.join(uploadsDir, imageName);

              try {
                // Read the file content and write it to the new location
                const fileContent = await readFile(file.filepath);
                await writeFile(imagePath, fileContent);

                await prisma.productImage.create({
                  data: {
                    url: `/uploads/${imageName}`,
                    productId: newProduct.id,
                  },
                });
              } catch (error) {
                console.error("Error processing additional image file:", error);
              }
            }
          }
        }

        const updatedProduct = await prisma.product.findUnique({
          where: { id: newProduct.id },
          include: { category: true, images: true },
        });

        res.status(201).json(updatedProduct);
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
