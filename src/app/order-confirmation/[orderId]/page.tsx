// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Invoice from "@/app/components/cart/Invoice";
// import { useCart } from "@/app/contexts/CartContext";

// export default function OrderConfirmationPage({
//   params,
// }: {
//   params: { orderId: string };
// }) {
//   const { items, totalPrice, clearCart } = useCart();
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState({
//     items: items,
//     subtotal: totalPrice,
//     tax: totalPrice * 0.05, // 5% tax
//     total: totalPrice * 1.05, // Total with tax
//   });

//   // Clear cart after showing the invoice (optional)
//   useEffect(() => {
//     // You might want to store the order in a database instead
//     // and fetch it here based on the orderId
//     // Uncomment this if you want to clear the cart after showing the invoice
//     // return () => {
//     //   clearCart();
//     // };
//   }, [clearCart]);

//   // If no items, try to fetch from API or redirect
//   useEffect(() => {
//     if (items.length === 0) {
//       // In a real app, you would fetch the order details from your API
//       // For now, we'll redirect to home if there are no items
//       // router.push('/');
//     }
//   }, [items, router]);

//   if (items.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto py-16 px-4 text-center">
//         <h1 className="text-3xl font-light mb-8">Order Confirmation</h1>
//         <p className="mb-8">Loading your order details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto mb-8 px-4">
//         <h1 className="text-3xl font-light text-center mb-2">
//           Thank You for Your Order
//         </h1>
//         <p className="text-center text-gray-600 mb-8">
//           Your order has been confirmed and will be shipped soon.
//         </p>
//       </div>

//       <Invoice
//         orderId={params.orderId}
//         items={orderDetails.items}
//         subtotal={orderDetails.subtotal}
//         tax={orderDetails.tax}
//         total={orderDetails.total}
//       />

//       <div className="max-w-4xl mx-auto mt-8 px-4 text-center">
//         <button
//           onClick={() => router.push("/shop")}
//           className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Invoice from "@/app/components/cart/Invoice";
import { useCart } from "@/app/contexts/CartContext";

// // Define the correct type for the params
// interface OrderConfirmationPageProps {
//   params: {
//     orderId: string;
//   };
// }

export default function OrderConfirmationPage() {
// {
//   params,
// }
// : OrderConfirmationPageProps
  //   const { items, totalPrice, clearCart } = useCart();
  //   const router = useRouter();
  //   const [orderDetails, setOrderDetails] = useState({
  //     items: items,
  //     subtotal: totalPrice,
  //     tax: totalPrice * 0.05, // 5% tax
  //     total: totalPrice * 1.05, // Total with tax
  //   });
  //   // Clear cart after showing the invoice (optional)
  //   useEffect(() => {
  //     // You might want to store the order in a database instead
  //     // and fetch it here based on the orderId
  //     // Uncomment this if you want to clear the cart after showing the invoice
  //     // return () => {
  //     //   clearCart();
  //     // };
  //   }, [clearCart]);
  //   // If no items, try to fetch from API or redirect
  //   useEffect(() => {
  //     if (items.length === 0) {
  //       // In a real app, you would fetch the order details from your API
  //       // For now, we'll redirect to home if there are no items
  //       // router.push('/');
  //     }
  //   }, [items, router]);
  //   if (items.length === 0) {
  //     return (
  //       <div className="max-w-4xl mx-auto py-16 px-4 text-center">
  //         <h1 className="text-3xl font-light mb-8">Order Confirmation</h1>
  //         <p className="mb-8">Loading your order details...</p>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div className="min-h-screen bg-gray-50 py-8">
  //       <div className="max-w-4xl mx-auto mb-8 px-4">
  //         <h1 className="text-3xl font-light text-center mb-2">
  //           Thank You for Your Order
  //         </h1>
  //         <p className="text-center text-gray-600 mb-8">
  //           Your order has been confirmed and will be shipped soon.
  //         </p>
  //       </div>
  //       <Invoice
  //         orderId={params.orderId}
  //         items={orderDetails.items}
  //         customerInfo={{
  //           firstName: "Customer",
  //           lastName: "Name",
  //           address: "Customer Address",
  //           phone: "Customer Phone",
  //         }}
  //         totalAmount={orderDetails.total}
  //         onClose={() => {}}
  //       />
  //       <div className="max-w-4xl mx-auto mt-8 px-4 text-center">
  //         <button
  //           onClick={() => router.push("/shop")}
  //           className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
  //         >
  //           Continue Shopping
  //         </button>
  //       </div>
  //     </div>
  //   );
}
