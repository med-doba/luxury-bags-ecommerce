"use client";

import { useState } from "react";
import Image from "next/image";
import { Printer, Phone, Mail } from "lucide-react";
import type { CartItem } from "@/app/contexts/CartContext";

interface InvoiceProps {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerName?: string;
  customerEmail?: string;
  shippingAddress?: string;
  orderDate?: string;
}

export default function Invoice({
  orderId,
  items,
  subtotal,
  tax,
  total,
  customerName = "",
  customerEmail = "",
  shippingAddress = "",
  orderDate = new Date().toLocaleDateString(),
}: InvoiceProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 500);
  };

  // Generate a unique cart ID based on order ID
  const cartId = `USCART${orderId.replace(/\D/g, "")}`;

  return (
    <div className="bg-white max-w-4xl mx-auto my-8 p-8 print:p-0 print:my-0 print:shadow-none shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-light tracking-widest uppercase">
          Luxury Bags
        </h1>
        <button
          onClick={handlePrint}
          className="flex items-center text-gray-700 hover:text-black print:hidden"
        >
          <Printer className="mr-2 h-5 w-5" />
          <span>Print</span>
        </button>
      </div>

      {/* Contact Info */}
      <div className="flex justify-center items-center gap-6 mb-16 text-gray-700">
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          <span>+212 600 000 000</span>
        </div>
        <div className="text-gray-300">|</div>
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          <span>assistance@luxurybags.com</span>
        </div>
      </div>

      {/* Main Title */}
      <h2 className="text-4xl font-light text-center tracking-widest mb-8">
        MY SHOPPING BAG
      </h2>

      {/* Order ID */}
      <p className="text-center mb-16 text-lg">BAG #{cartId}</p>

      <hr className="mb-12 border-gray-200" />

      {/* Items */}
      {items.map((item, index) => (
        <div key={item.id} className="mb-12">
          <div className="flex gap-8">
            <div className="w-32 h-24 relative">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Style # {item.id.substring(0, 6).toUpperCase()}
              </p>
              {/* Since color and size aren't in your CartItem interface, we'll use defaults */}
              <p className="text-sm text-gray-600 mb-1">
                Style: Premium Leather
              </p>
              <p className="text-sm text-gray-600 mb-1">Size: Universal</p>
              <p className="text-sm font-semibold mt-2">AVAILABLE</p>
              <p className="text-sm text-gray-600">
                Enjoy complimentary delivery or Collect In Store.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl mb-2">${item.price.toLocaleString()}</p>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
          </div>
          {index < items.length - 1 && <hr className="my-8 border-gray-200" />}
        </div>
      ))}

      <hr className="mb-8 border-gray-200" />

      {/* Order Summary */}
      <div className="max-w-md ml-auto">
        <div className="flex justify-between mb-4">
          <p className="text-lg">Subtotal</p>
          <p className="text-lg">${subtotal.toLocaleString()}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-lg">Shipping</p>
          <p className="text-lg">Free (Premium Express)</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-lg">Estimated Tax</p>
          <p className="text-lg">${tax.toLocaleString()}</p>
        </div>
        <div className="flex justify-between mb-4 pt-4 border-t border-gray-200">
          <p className="text-lg font-medium">Estimated Total</p>
          <p className="text-2xl">${total.toLocaleString()}</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            padding: 0;
            margin: 0;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }
          nav,
          footer,
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
