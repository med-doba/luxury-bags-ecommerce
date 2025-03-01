// "use client";

// import { useState, useEffect } from "react";
// import type { Product } from "@/lib/types";
// import ProductGallery from "../../components/ProductGallery";
// import ColorSelector from "../../components/ColorSelector";
// import SizeSelector from "../../components/SizeSelector";
// import AddToCartButton from "../../components/AddToCartButton";
// import RelatedProducts from "../../components/RelatedProducts";
// import { Star, Truck, ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";

// async function getProduct(id: string): Promise<Product | null> {
//   // Implement actual data fetching logic here
//   // For now, we'll return a mock product
//   return {
//     id: id,
//     name: "Elegant Leather Tote",
//     price: 1299.99,
//     originalPrice: 1599.99,
//     description:
//       "Crafted from the finest Italian leather, this tote embodies luxury and functionality. Perfect for the discerning individual who appreciates timeless elegance combined with modern practicality.",
//     imageSrc: "/images/elegant-leather-tote.jpg",
//     category: "tote",
//     color: "black",
//     size: "medium",
//     colors: ["black", "brown", "navy"],
//     sizes: ["small", "medium", "large"],
//     images: [
//       "/classic-tote.jpg",
//       "/images/1.jpg",
//       "/images/2.jpg",
//       "/images/3.jpg",
//     ],
//     rating: 4.8,
//     reviews: 256,
//     seller: "Luxury Bags Co.",
//     sellerRating: 4.9,
//   };
// }

// export default function ProductPage({
//   params,
// }: {
//   params: { productId: string };
// }) {
//   const [product, setProduct] = useState<Product | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     getProduct(params.productId).then(setProduct);
//   }, [params.productId]);

//   if (!product) {
//     return <div>Loading...</div>; // Or a more sophisticated loading state
//   }

//   const discountPercentage = Math.round(
//     ((product.originalPrice - product.price) / product.originalPrice) * 100
//   );

//   const handleBuyNow = () => {
//     // Navigate to checkout with product data
//     router.push(`/checkout?product=${params.productId}`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         <ProductGallery images={product.images} />
//         <div className="space-y-8">
//           <div>
//             <h1 className="text-3xl font-light text-gray-900 mb-2">
//               {product.name}
//             </h1>
//             <div className="flex items-center space-x-2 mb-4">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-5 w-5 ${
//                       i < Math.floor(product.rating)
//                         ? "text-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-600">
//                 {product.rating} ({product.reviews} reviews)
//               </span>
//             </div>
//             <div className="flex items-baseline space-x-4">
//               <p className="text-3xl font-medium text-red-600">
//                 ${product.price.toLocaleString()}
//               </p>
//               <p className="text-xl text-gray-500 line-through">
//                 ${product.originalPrice.toLocaleString()}
//               </p>
//               <p className="text-lg font-semibold text-red-600">
//                 -{discountPercentage}% OFF
//               </p>
//             </div>
//           </div>

//           <div className="bg-gray-100 p-4 rounded-lg">
//             <div className="flex items-center space-x-2 mb-2">
//               <Truck className="h-5 w-5 text-gray-600" />
//               <span className="font-medium">Free Shipping</span>
//             </div>
//             <p className="text-sm text-gray-600">
//               Estimated delivery: 3-5 business days
//             </p>
//           </div>

//           <ColorSelector colors={product.colors} />
//           <SizeSelector sizes={product.sizes} />

//           <div className="flex space-x-4">
//             <AddToCartButton />
//             <button
//               onClick={handleBuyNow}
//               className="flex-1 bg-red-600 text-white py-3 px-8 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
//             >
//               Buy Now
//             </button>
//           </div>

//           <div className="border-t border-gray-200 pt-8">
//             <h2 className="text-lg font-medium mb-4">Product Specifications</h2>
//             <table className="w-full text-sm">
//               <tbody>
//                 <tr className="border-b">
//                   <td className="py-2 text-gray-600">Material</td>
//                   <td className="py-2">100% genuine Italian leather</td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="py-2 text-gray-600">Dimensions</td>
//                   <td className="py-2">14" x 11" x 5"</td>
//                 </tr>
//                 <tr className="border-b">
//                   <td className="py-2 text-gray-600">Weight</td>
//                   <td className="py-2">2.5 lbs</td>
//                 </tr>
//                 <tr>
//                   <td className="py-2 text-gray-600">Closure</td>
//                   <td className="py-2">Zip-top</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="border-t border-gray-200 pt-8">
//             <h2 className="text-lg font-medium mb-4">Seller Information</h2>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">{product.seller}</p>
//                 <div className="flex items-center mt-1">
//                   <Star className="h-4 w-4 text-yellow-400 mr-1" />
//                   <span className="text-sm text-gray-600">
//                     {product.sellerRating} Positive Feedback
//                   </span>
//                 </div>
//               </div>
//               <button className="text-primary hover:text-secondary transition-colors duration-200 flex items-center">
//                 Visit Store <ArrowRight className="h-4 w-4 ml-1" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-16">
//         <h2 className="text-2xl font-light mb-6">Product Description</h2>
//         <div className="prose max-w-none">
//           <p>{product.description}</p>
//           <h3>Key Features:</h3>
//           <ul>
//             <li>Premium Italian leather construction</li>
//             <li>Spacious main compartment with zip closure</li>
//             <li>Interior zip pocket and two slip pockets</li>
//             <li>Adjustable shoulder strap</li>
//             <li>Gold-tone hardware accents</li>
//           </ul>
//           <p>
//             Experience unparalleled luxury and functionality with our Elegant
//             Leather Tote. Whether you're heading to the office or enjoying a
//             weekend getaway, this versatile bag is the perfect companion for the
//             modern, sophisticated individual.
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={product.category} />
//     </div>
//   );
// }

// import { notFound } from "next/navigation";
// import prisma from "@/lib/prisma";
// import ProductDetails from "./ProductDetails";

// async function getProduct(id: string) {
//   const product = await prisma.product.findUnique({
//     where: { id },
//     include: { category: true },
//   });

//   if (!product) {
//     notFound();
//   }

//   // Simulating multiple images for the product
//   const images = [
//     product.imageUrl,
//     "/placeholder.svg",
//     "/placeholder.svg",
//     "/placeholder.svg",
//     "/placeholder.svg",
//   ];

//   return { ...product, images };
// }

// export default async function ProductPage({
//   params,
// }: {
//   params: { productId: string };
// }) {
//   const product = await getProduct(params.productId);

//   return <ProductDetails product={product} />;
// }
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductDetails from "./ProductDetails";

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  // Simulating additional product data
  const enhancedProduct = {
    ...product,
    originalPrice: product.price * 1.2, // 20% higher than the current price
    images: [
      product.imageUrl,
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    colors: ["black", "brown", "navy"],
    sizes: ["small", "medium", "large"],
    rating: 4.8,
    reviews: 256,
    seller: "Luxury Bags Co.",
    sellerRating: 4.9,
  };

  return enhancedProduct;
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProduct(params.productId);

  return <ProductDetails product={product} />;
}
