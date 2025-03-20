"use client";

import { useState, useEffect } from "react";
import Invoice from "@/app/components/Invoice";
import { useCart } from "@/app/contexts/CartContext";

export default function InvoicePage() {
  const { items, totalPrice } = useCart();
  const [orderId, setOrderId] = useState("");

  // Generate a random order ID on component mount
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, "0");
    setOrderId(randomId);
  }, []);

  const subtotal = totalPrice;
  const tax = subtotal * 0.05; // 5% tax rate
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Invoice
        orderId={orderId}
        items={items}
        subtotal={subtotal}
        tax={tax}
        total={total}
      />
    </div>
  );
}
