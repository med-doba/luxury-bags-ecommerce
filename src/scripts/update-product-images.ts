import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateProductImages() {
  const products = await prisma.product.findMany();

  for (const product of products) {
    const placeholderImages = [
      "/placeholder-1.jpg",
      "/placeholder-2.jpg",
      "/placeholder-3.jpg",
    ];

    await prisma.productImage.createMany({
      data: placeholderImages.map((url) => ({
        url,
        productId: product.id,
      })),
    });
  }

  console.log("Updated existing products with placeholder images");
}

updateProductImages()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
