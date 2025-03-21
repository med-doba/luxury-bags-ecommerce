// "use client";

// import { useCart } from "@/app/contexts/CartContext";
// import CheckoutFlow from "@/app/components/cart/CheckoutFlow";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function CheckoutPage() {
//   const { items, totalPrice } = useCart();
//   const router = useRouter();

//   // Redirect to basket if cart is empty
//   useEffect(() => {
//     if (items.length === 0) {
//       router.push("/basket");
//     }
//   }, [items, router]);

//   if (items.length === 0) {
//     return null; // Will redirect, no need to render anything
//   }

//   return <CheckoutFlow initialProducts={items} totalAmount={totalPrice} />;
// }

"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/contexts/CartContext";
import CheckoutFlow from "@/app/components/cart/CheckoutFlow";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to basket if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/basket");
    }
  }, [items, router]);

  if (items.length === 0) {
    return null; // Will redirect, no need to render anything
  }

  // Ensure all items have color and size properties
  const processedItems = items.map((item) => ({
    ...item,
    color: item.color || "Default",
    size: item.size || "Universal",
  }));

  const subtotal = totalPrice;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to invoice page
    router.push("/invoice");
  };

  return (
    <CheckoutFlow initialProducts={processedItems} totalAmount={totalPrice} />
  );
}
