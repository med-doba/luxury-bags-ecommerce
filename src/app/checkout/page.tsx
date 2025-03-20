"use client";

import { useCart } from "@/app/contexts/CartContext";
import CheckoutFlow from "@/app/components/cart/CheckoutFlow";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();

  // Redirect to basket if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/basket");
    }
  }, [items, router]);

  if (items.length === 0) {
    return null; // Will redirect, no need to render anything
  }

  return <CheckoutFlow initialProducts={items} totalAmount={totalPrice} />;
}
