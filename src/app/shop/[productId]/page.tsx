import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductDetails from "./ProductDetails";
import { Prisma } from "@prisma/client";

async function getProduct(id: string) {
  const product = await (prisma.product.findUnique as any)({
    where: { id },
    include: {
      category: true,
      images: true, // Legacy images
      colorVariants: {
        include: {
          images: true,
          sizeVariants: true, // Include nested size variants for each color
        },
      },
      sizeVariants: true, // Legacy size variants
    },
  });

  if (!product) {
    notFound();
  }

  // Convert Decimal to number and ensure all required fields are present
  const productWithRelations = product as any;
  const serializedProduct = {
    ...product,
    price: Number(product.price) || 0,
    originalPrice: Number(product.price) || 0,
    images: productWithRelations.images || [],
    rating: 0,
    reviews: 0,
    colors: Array.isArray(product.color)
      ? product.color
      : [product.color ?? "black"],
    sizes: Array.isArray(product.size) ? product.size : [product.size ?? "L"],
    seller: "Unknown Seller",
    sellerRating: 0,
    // Serialize nested color variants with size variants
    colorVariants:
      productWithRelations.colorVariants?.map((cv: any) => ({
        ...cv,
        sizeVariants:
          cv.sizeVariants?.map((sv: any) => ({
            ...sv,
            price: sv.price ? Number(sv.price) : Number(product.price),
          })) || [],
      })) || [],
    // Serialize legacy size variants
    sizeVariants:
      productWithRelations.sizeVariants?.map((sv: any) => ({
        ...sv,
        price: sv.price ? Number(sv.price) : Number(product.price),
      })) || [],
  };

  return serializedProduct;
}

// Remove type annotations completely and let Next.js infer the types
// export default async function ProductPage({ params }: any) {
//   const product = await getProduct(params.productId);

//   return <ProductDetails product={product} />;
// }
export default async function ProductPage({ params }: any) {
  const resolvedParams = (await params) || {};

  if (!resolvedParams.productId) {
    notFound();
  }

  const product = await getProduct(resolvedParams.productId);
  return <ProductDetails product={product} />;
}
