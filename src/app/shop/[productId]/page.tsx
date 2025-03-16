import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductDetails from "./ProductDetails";

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Convert Decimal to number and ensure all required fields are present
  const serializedProduct = {
    ...product,
    // price: product.price.toNumber(),
    price: Number(product.price) || 0,
    originalPrice: Number(product.price) || 0,
    // originalPrice: product.price.toNumber(),
    images: product.images || [],
    rating: 0,
    reviews: 0,
    // colors: [product.color],
    // sizes: [product.size],
    colors: Array.isArray(product.color)
      ? product.color
      : [product.color ?? "black"],
    sizes: Array.isArray(product.size) ? product.size : [product.size ?? "L"],
    seller: "Unknown Seller",
    sellerRating: 0,
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
