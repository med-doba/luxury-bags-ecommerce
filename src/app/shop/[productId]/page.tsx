// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { Product } from "@/lib/types";

// // Mock function to fetch product data
// async function getProduct(id: string): Promise<Product | null> {
//   // Implement actual data fetching logic here
//   return null;
// }

// export default async function ProductPage({
//   params,
// }: {
//   params: { productId: string };
// }) {
//   // const product = await getProduct(params.productId);

//   // if (!product) {
//   //   notFound();
//   // }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <Image
//             // src={"product.imageSrc" || "/placeholder.svg"}
//             src={"/images/1.jpg" || "/placeholder.svg"}
//             // alt={"product.name"}
//             alt={"product.name"}
//             width={600}
//             height={600}
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//         <div>
//           <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
//             {"product.name"}
//           </h1>
//           <p className="text-2xl text-gray-900 mb-6">${"product.price"}</p>
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Description</h2>
//             <p className="text-gray-600">{"product.description"}</p>
//           </div>
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Colors</h2>
//             {/* Add color options here */}
//           </div>
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Size</h2>
//             {/* Add size options here */}
//           </div>
//           <button className="w-full bg-gray-900 text-white py-3 px-8 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import type { Product } from "@/lib/types";
import ProductGallery from "../../components/ProductGallery";
import ColorSelector from "../../components/ColorSelector";
import SizeSelector from "../../components/SizeSelector";
import AddToCartButton from "../../components/AddToCartButton";
import RelatedProducts from "../../components/RelatedProducts";

async function getProduct(id: string): Promise<Product | null> {
  // Implement actual data fetching logic here
  // For now, we'll return a mock product
  return {
    id: id,
    name: "Elegant Leather Tote",
    price: 1299.99,
    description:
      "Crafted from the finest Italian leather, this tote embodies luxury and functionality. Perfect for the discerning individual who appreciates timeless elegance combined with modern practicality.",
    imageSrc: "/images/elegant-leather-tote.jpg",
    category: "tote",
    color: "black",
    size: "medium",
    colors: ["black", "brown", "navy"],
    sizes: ["small", "medium", "large"],
    images: [
      "/classic-tote.jpg",
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
    ],
  };
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProduct(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductGallery images={product.images} />
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-gray-900">
              ${product.price.toLocaleString()}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          <ColorSelector colors={product.colors} />
          <SizeSelector sizes={product.sizes} />
          <AddToCartButton />
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-medium mb-4">Details</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Made in Italy</li>
              <li>100% genuine leather</li>
              <li>Gold-tone hardware</li>
              <li>Interior zip pocket</li>
              <li>Adjustable shoulder strap</li>
            </ul>
          </div>
        </div>
      </div>
      <RelatedProducts category={product.category} />
    </div>
  );
}
