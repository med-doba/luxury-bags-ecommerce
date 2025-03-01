// import CheckoutFlow from "../components/cart/CheckoutFlow";

// export default function CheckoutPage() {
//   return <CheckoutFlow />;
// }

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CheckoutFlow from "../components/cart/CheckoutFlow";
import type { Product } from "@/lib/types";

async function getProduct(id: string): Promise<Product | null> {
  // This should match your product fetching logic from the product page
  // For now using the same mock data
  return {
    id: id,
    name: "Elegant Leather Tote",
    price: 1299.99,
    // ... other product fields
  };
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      getProduct(productId).then(setProduct);
    }
  }, [searchParams]);

  if (!product) {
    return <div>Loading...</div>; // Or a more sophisticated loading state
  }

  return (
    <CheckoutFlow initialProducts={[product]} totalAmount={product.price} />
  );
}
