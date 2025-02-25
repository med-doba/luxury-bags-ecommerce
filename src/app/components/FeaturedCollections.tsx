// import type { Product } from "@/lib/types";
// import ProductGrid from "./ProductGrid";

// export default function FeaturedCollections({
//   products,
// }: {
//   products: Product[];
// }) {
//   return (
//     <section className="bg-background">
//       <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
//         <h2 className="text-3xl font-extrabold text-primary mb-6">
//           Featured Collections
//         </h2>
//         <div className="border-b border-accent mb-8"></div>
//         <ProductGrid products={products} />
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

interface FeaturedCollectionsProps {
  products: Product[];
}

export default function FeaturedCollections({
  products,
}: FeaturedCollectionsProps) {
  const [displayCount, setDisplayCount] = useState(8);
  const totalProducts = products.length;

  const loadMore = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 4, totalProducts));
  };

  return (
    <section className="bg-background">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl font-extrabold text-primary">
            Featured Collections
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-primary hover:text-secondary transition-colors duration-300"
          >
            View All
          </Link>
        </div>
        <div className="border-b border-accent mb-8"></div>
        <ProductGrid products={products.slice(0, displayCount)} />
        {displayCount < totalProducts && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="inline-block bg-primary text-white py-2 px-6 border border-transparent rounded-md text-sm font-medium hover:bg-secondary transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
