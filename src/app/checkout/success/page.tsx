"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/contexts/CartContext";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { items } = useCart();

  // If there are no items and no order ID in the URL, redirect to home
  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items, router]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-medium mb-4">
          Merci pour votre commande !
        </h1>
        <p className="text-gray-600 mb-8">
          Votre commande a été reçue et est en cours de traitement. Vous
          recevrez un e-mail de confirmation sous peu.
        </p>
        <div className="inline-block border border-gray-300 rounded-lg px-6 py-4 mb-8">
          <p className="text-sm text-gray-600">Numéro de commande</p>
          <p className="text-lg font-medium">
            #ORD-
            {Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-medium mb-4">Résumé de la commande</h2>
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  Quantité: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <span className="font-medium">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/shop"
          className="inline-block bg-black text-white py-3 px-8 rounded transition-colors hover:bg-gray-800"
        >
          Continuer vos achats
        </Link>
      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { CheckCircle, Download } from "lucide-react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/app/contexts/CartContext";

// export default function CheckoutSuccessPage() {
//   const router = useRouter();
//   const { items, clearCart } = useCart();
//   const orderNumber = `ORD-${Math.floor(Math.random() * 10000)
//     .toString()
//     .padStart(4, "0")}`;

//   // If there are no items and no order ID in the URL, redirect to home
//   useEffect(() => {
//     if (items.length === 0) {
//       router.push("/");
//     }

//     // Clear the cart after showing the success page
//     return () => {
//       clearCart();
//     };
//   }, [items, router, clearCart]);

//   const generateInvoicePDF = () => {
//     // In a real application, this would generate a PDF invoice
//     // For this example, we'll create a simple text representation
//     let invoiceContent = "INVOICE\n\n";
//     invoiceContent += `Date: ${new Date().toLocaleDateString()}\n`;
//     invoiceContent += `Order #: ${orderNumber}\n\n`;

//     invoiceContent += "ITEMS\n";
//     items.forEach((item) => {
//       invoiceContent += `${item.name} x ${item.quantity} - $${(
//         item.price * item.quantity
//       ).toLocaleString()}\n`;
//     });

//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     invoiceContent += `\nSous-total: $${totalAmount.toLocaleString()}\n`;
//     invoiceContent += "Taxes et droits: Included\n";
//     invoiceContent += "Shipping: Free\n";
//     invoiceContent += `TOTAL: $${totalAmount.toLocaleString()}\n\n`;

//     invoiceContent += "PAYMENT METHOD\n";
//     invoiceContent += "Cash on Delivery\n\n";

//     invoiceContent += "Thank you for your order!";

//     // Create a Blob with the invoice content
//     const blob = new Blob([invoiceContent], { type: "text/plain" });

//     // Create a download link and trigger the download
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `invoice-${orderNumber}.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-16">
//       <div className="text-center mb-12">
//         <div className="flex justify-center mb-6">
//           <CheckCircle className="h-16 w-16 text-green-500" />
//         </div>
//         <h1 className="text-3xl font-medium mb-4">Thank You for Your Order!</h1>
//         <p className="text-gray-600 mb-8">
//           Your order has been received and is now being processed. You will
//           receive a confirmation email shortly.
//         </p>
//         <div className="inline-block border border-gray-300 rounded-lg px-6 py-4 mb-8">
//           <p className="text-sm text-gray-600">Order Number</p>
//           <p className="text-lg font-medium">{orderNumber}</p>
//         </div>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <h2 className="text-xl font-medium mb-4">Order Summary</h2>
//         <div className="space-y-4 mb-6">
//           {items.map((item) => (
//             <div key={item.id} className="flex gap-4">
//               <Image
//                 src={item.imageUrl || "/placeholder.svg"}
//                 alt={item.name}
//                 width={80}
//                 height={80}
//                 className="rounded"
//               />
//               <div className="flex-1">
//                 <h4 className="font-medium">{item.name}</h4>
//                 <p className="text-sm text-gray-600">
//                   Quantity: {item.quantity}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <span className="font-medium">
//                   ${(item.price * item.quantity).toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="border-t pt-4 mb-6">
//           <div className="flex justify-between mb-2">
//             <span>Total</span>
//             <span className="font-medium">
//               $
//               {items
//                 .reduce((sum, item) => sum + item.price * item.quantity, 0)
//                 .toLocaleString()}
//             </span>
//           </div>
//           <div className="flex items-center mt-4 bg-blue-50 p-4 rounded-lg">
//             <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
//             <span>Payment Method: Cash on Delivery</span>
//           </div>
//         </div>

//         <button
//           onClick={generateInvoicePDF}
//           className="w-full flex justify-center items-center py-3 border border-black text-black hover:bg-gray-100 rounded-md"
//         >
//           <Download className="h-5 w-5 mr-2" />
//           Download Invoice
//         </button>
//       </div>

//       <div className="text-center">
//         <Link
//           href="/shop"
//           className="inline-block bg-black text-white py-3 px-8 rounded transition-colors hover:bg-gray-800"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     </div>
//   );
// }
