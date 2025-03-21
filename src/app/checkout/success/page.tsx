// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { CheckCircle } from "lucide-react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/app/contexts/CartContext";

// export default function CheckoutSuccessPage() {
//   const router = useRouter();
//   const { items } = useCart();

//   // If there are no items and no order ID in the URL, redirect to home
//   useEffect(() => {
//     if (items.length === 0) {
//       router.push("/");
//     }
//   }, [items, router]);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-20">
//       <div className="text-center mb-12">
//         <div className="flex justify-center mb-6">
//           <CheckCircle className="h-16 w-16 text-green-500" />
//         </div>
//         <h1 className="text-3xl font-medium mb-4">
//           Merci pour votre commande !
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Votre commande a été reçue et est en cours de traitement. Vous
//           recevrez un e-mail de confirmation sous peu.
//         </p>
//         <div className="inline-block border border-gray-300 rounded-lg px-6 py-4 mb-8">
//           <p className="text-sm text-gray-600">Numéro de commande</p>
//           <p className="text-lg font-medium">
//             #ORD-
//             {Math.floor(Math.random() * 10000)
//               .toString()
//               .padStart(4, "0")}
//           </p>
//         </div>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <h2 className="text-xl font-medium mb-4">Résumé de la commande</h2>
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
//                   Quantité: {item.quantity}
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
//       </div>

//       <div className="text-center">
//         <Link
//           href="/shop"
//           className="inline-block bg-black text-white py-3 px-8 rounded transition-colors hover:bg-gray-800"
//         >
//           Continuer vos achats
//         </Link>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { CheckCircle } from "lucide-react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/app/contexts/CartContext";

// export default function CheckoutSuccessPage() {
//   const router = useRouter();
//   const { items, orderId } = useCart();

//   // If there are no items and no order ID in the URL, redirect to home
//   useEffect(() => {
//     if (items.length === 0 && !orderId) {
//       router.push("/");
//     }
//   }, [items, orderId, router]);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-20">
//       <div className="text-center mb-12">
//         <div className="flex justify-center mb-6">
//           <CheckCircle className="h-16 w-16 text-green-500" />
//         </div>
//         <h1 className="text-3xl font-medium mb-4">
//           Merci pour votre commande !
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Votre commande a été reçue et est en cours de traitement. Vous
//           recevrez un e-mail de confirmation sous peu.
//         </p>
//         <div className="inline-block border border-gray-300 rounded-lg px-6 py-4 mb-8">
//           <p className="text-sm text-gray-600">Numéro de commande</p>
//           <p className="text-lg font-medium">
//             {orderId ? `USCART${orderId}` : "En attente..."}
//           </p>
//         </div>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <h2 className="text-xl font-medium mb-4">Résumé de la commande</h2>
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
//                   Quantité: {item.quantity}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <span className="font-medium">
//                   {(item.price * item.quantity).toLocaleString()} MAD
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="text-center">
//         <Link
//           href="/shop"
//           className="inline-block bg-black text-white py-3 px-8 rounded transition-colors hover:bg-gray-800"
//         >
//           Continuer vos achats
//         </Link>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { CheckCircle } from "lucide-react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/app/contexts/CartContext";

// export default function CheckoutSuccessPage() {
//   const router = useRouter();
//   const { items, orderId, clearCart } = useCart();

//   // Clear cart after the page has loaded and we've captured the items
//   useEffect(() => {
//     // If we have items, we can safely clear the cart now
//     if (items.length > 0) {
//       // Use a small timeout to ensure the page has fully rendered
//       const timer = setTimeout(() => {
//         clearCart();
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [items, clearCart]);

//   // If there are no items and no order ID in the URL, redirect to home
//   useEffect(() => {
//     if (items.length === 0 && !orderId) {
//       router.push("/");
//     }
//   }, [items, orderId, router]);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-20">
//       <div className="text-center mb-12">
//         <div className="flex justify-center mb-6">
//           <CheckCircle className="h-16 w-16 text-green-500" />
//         </div>
//         <h1 className="text-3xl font-medium mb-4">
//           Merci pour votre commande !
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Votre commande a été reçue et est en cours de traitement. Vous
//           recevrez un e-mail de confirmation sous peu.
//         </p>
//         <div className="inline-block border border-gray-300 rounded-lg px-6 py-4 mb-8">
//           <p className="text-sm text-gray-600">Numéro de commande</p>
//           <p className="text-lg font-medium">
//             {orderId ? `USCART${orderId}` : "En attente..."}
//           </p>
//         </div>
//       </div>

//       {/* <div className="bg-gray-50 p-6 rounded-lg mb-8">
//         <h2 className="text-xl font-medium mb-4">Résumé de la commande</h2>
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
//                   Quantité: {item.quantity}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <span className="font-medium">
//                   {(item.price * item.quantity).toLocaleString()} MAD
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div> */}

//       <div className="text-center">
//         <Link
//           href="/shop"
//           className="inline-block bg-black text-white py-3 px-8 rounded transition-colors hover:bg-gray-800"
//         >
//           Continuer vos achats
//         </Link>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/contexts/CartContext";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { items, orderId, clearCart } = useCart();
  const [displayOrderId, setDisplayOrderId] = useState(orderId);

  // Store the order ID when the component mounts to prevent it from changing
  useEffect(() => {
    if (orderId) {
      setDisplayOrderId(orderId);
    }
  }, [orderId]);

  // Clear cart after the page has loaded and we've captured the items
  useEffect(() => {
    // If we have items, we can safely clear the cart now
    if (items.length > 0) {
      // Use a small timeout to ensure the page has fully rendered
      const timer = setTimeout(() => {
        clearCart();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [items, clearCart]);

  // If there are no items and no order ID in the URL, redirect to home
  useEffect(() => {
    if (items.length === 0 && !orderId) {
      router.push("/");
    }
  }, [items, orderId, router]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
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
            {displayOrderId ? `USCART${displayOrderId}` : "En attente..."}
          </p>
        </div>
      </div>

      {/* <div className="bg-gray-50 p-6 rounded-lg mb-8">
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
                {item.color && (
                  <p className="text-sm text-gray-600">Couleur: {item.color}</p>
                )}
                {item.size && (
                  <p className="text-sm text-gray-600">Taille: {item.size}</p>
                )}
              </div>
              <div className="text-right">
                <span className="font-medium">
                  {(item.price * item.quantity).toLocaleString()} MAD
                </span>
              </div>
            </div>
          ))}
        </div>
      </div> */}

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
