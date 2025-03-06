// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Minus, Plus, X, Bookmark, ChevronDown } from "lucide-react";

// interface CartItem {
//   id: number;
//   name: string;
//   color: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface CartDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
//   const [showReturns, setShowReturns] = useState(false);
//   const [items, setItems] = useState<CartItem[]>([
//     {
//       id: 1,
//       name: "Medium Flamenco purse in mellow nappa lambskin",
//       color: "Dark Burgundy",
//       price: 37100.0,
//       quantity: 1,
//       image: "/classic-tote.jpg",
//     },
//     {
//       id: 2,
//       name: "Medium Flamenco purse in mellow nappa lambskin",
//       color: "Sahara",
//       price: 37100.0,
//       quantity: 1,
//       image: "/classic-tote.jpg",
//     },
//   ]);

//   const updateQuantity = (id: number, change: number) => {
//     setItems(
//       items.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     );
//   };

//   const removeItem = (id: number) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div
//       className={`fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="h-full flex flex-col">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl">Basket · {items.length}</h2>
//           <button onClick={onClose} className="p-2">
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {items.map((item) => (
//             <div key={item.id} className="p-4 border-b">
//               <div className="flex gap-4">
//                 <Image
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.name}
//                   width={100}
//                   height={100}
//                   className="object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium">{item.name}</h3>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Colour: {item.color}
//                   </p>
//                   <div className="flex items-center mt-2 space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, -1)}
//                       className="p-1 border rounded"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, 1)}
//                       className="p-1 border rounded"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                   <span className="font-medium">
//                     {item.price.toLocaleString()}د.إ
//                   </span>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="text-sm underline"
//                     >
//                       Delete
//                     </button>
//                     <button className="p-1">
//                       <Bookmark className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="p-4 border-b">
//             <div className="flex items-center gap-2 text-sm mb-4">
//               <Image
//                 src="/classic-tote.jpg"
//                 alt="Package"
//                 width={40}
//                 height={40}
//               />
//               <p>
//                 All purchases made will arrive in our signature monochrome
//                 packaging. You can also add a personalised card on your gifts.
//               </p>
//             </div>

//             <div className="space-y-1 text-sm">
//               <p>Free shipping in 2-7 business days</p>
//               <p>Free online returns for 14 days</p>
//               <p>Free exchange in store for 30 days</p>
//               <button
//                 onClick={() => setShowReturns(!showReturns)}
//                 className="flex items-center text-sm mt-2"
//               >
//                 Learn more <ChevronDown className="h-4 w-4 ml-1" />
//               </button>
//             </div>
//           </div>

//           {showReturns && <ReturnPolicy />}
//         </div>

//         <div className="p-4 border-t mt-auto">
//           <div className="flex justify-between mb-4">
//             <span>Subtotal</span>
//             <span className="font-medium">{subtotal.toLocaleString()}د.إ</span>
//           </div>
//           <div className="space-y-2">
//             {/* <button className="w-full bg-black text-white py-3 px-4">
//               Checkout
//             </button> */}
//             <Link
//               href="/checkout"
//               className="block w-full bg-black text-white text-center py-3 px-4 rounded transition-colors hover:bg-gray-800"
//             >
//               Proceed to Checkout
//             </Link>
//             <Link
//               href="/basket"
//               className="block w-full text-center py-3 px-4 border border-black"
//             >
//               View your basket
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ReturnPolicy() {
//   return (
//     <div className="p-4 bg-gray-50">
//       <h3 className="font-medium mb-4">Free returns</h3>
//       <div className="space-y-4 text-sm">
//         <div>
//           <p className="mb-2">
//             Free returns are available within 14 days of your online order
//             delivery date.
//           </p>
//           <p>
//             Please note that the items must be in re-saleable condition and that
//             personalised items are non-exchangeable, non-refundable.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-medium mb-2">Free exchange in store</h4>
//           <p>
//             You can visit one of our retail stores within 30 days after the date
//             of purchase using the delivery note included in the package.
//           </p>
//           <p>
//             Exchanges cannot be made at franchise stores, outlets or department
//             stores.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-medium mb-2">Store pick up</h4>
//           <p>Select a LOEWE store to collect your order.</p>
//           <p>
//             You can see the complete list of stores where this service is
//             available here.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Minus, Plus, X, Bookmark, ChevronDown } from "lucide-react";
// import { useCart } from "@/app/contexts/CartContext";

// interface CartDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
//   const [showReturns, setShowReturns] = useState(false);
//   const { items, removeItem, updateQuantity, totalPrice } = useCart();

//   return (
//     <div
//       className={`fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="h-full flex flex-col">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl">Basket · {items.length}</h2>
//           <button onClick={onClose} className="p-2">
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {items.map((item) => (
//             <div key={item.id} className="p-4 border-b">
//               <div className="flex gap-4">
//                 <Image
//                   src={item.imageUrl || "/placeholder.svg"}
//                   alt={item.name}
//                   width={100}
//                   height={100}
//                   className="object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium">{item.name}</h3>
//                   <div className="flex items-center mt-2 space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="p-1 border rounded"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="p-1 border rounded"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                   <span className="font-medium">
//                     {item.price.toLocaleString()}د.إ
//                   </span>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="text-sm underline"
//                     >
//                       Delete
//                     </button>
//                     <button className="p-1">
//                       <Bookmark className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="p-4 border-b">
//             <div className="flex items-center gap-2 text-sm mb-4">
//               <Image
//                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.14-3OOfluGiDPbF1IEfxBNU5Og5vNxc8U.png"
//                 alt="Package"
//                 width={40}
//                 height={40}
//               />
//               <p>
//                 All purchases made will arrive in our signature monochrome
//                 packaging. You can also add a personalised card on your gifts.
//               </p>
//             </div>

//             <div className="space-y-1 text-sm">
//               <p>Free shipping in 2-7 business days</p>
//               <p>Free online returns for 14 days</p>
//               <p>Free exchange in store for 30 days</p>
//               <button
//                 onClick={() => setShowReturns(!showReturns)}
//                 className="flex items-center text-sm mt-2"
//               >
//                 Learn more <ChevronDown className="h-4 w-4 ml-1" />
//               </button>
//             </div>
//           </div>

//           {showReturns && <ReturnPolicy />}
//         </div>

//         <div className="p-4 border-t mt-auto">
//           <div className="flex justify-between mb-4">
//             <span>Subtotal</span>
//             <span className="font-medium">
//               {totalPrice.toLocaleString()}د.إ
//             </span>
//           </div>
//           <div className="space-y-2">
//             <Link
//               href="/checkout"
//               className="block w-full bg-black text-white text-center py-3 px-4 rounded transition-colors hover:bg-gray-800"
//             >
//               Proceed to Checkout
//             </Link>
//             <Link
//               href="/basket"
//               className="block w-full text-center py-3 px-4 border border-black rounded hover:bg-gray-100 transition-colors"
//             >
//               View your basket
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ReturnPolicy() {
//   return (
//     <div className="p-4 bg-gray-50">
//       <h3 className="font-medium mb-4">Free returns</h3>
//       <div className="space-y-4 text-sm">
//         <div>
//           <p className="mb-2">
//             Free returns are available within 14 days of your online order
//             delivery date.
//           </p>
//           <p>
//             Please note that the items must be in re-saleable condition and that
//             personalised items are non-exchangeable, non-refundable.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-medium mb-2">Free exchange in store</h4>
//           <p>
//             You can visit one of our retail stores within 30 days after the date
//             of purchase using the delivery note included in the package.
//           </p>
//           <p>
//             Exchanges cannot be made at franchise stores, outlets or department
//             stores.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-medium mb-2">Store pick up</h4>
//           <p>Select a LOEWE store to collect your order.</p>
//           <p>
//             You can see the complete list of stores where this service is
//             available here.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Bookmark, ChevronDown } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [showReturns, setShowReturns] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <>
      {/* Overlay that closes the drawer when clicked */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl">Basket · {items.length}</h2>
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="p-4 border-b">
                <div className="flex gap-4">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 border rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 border rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-medium">
                      {item.price.toLocaleString()}MAD
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm underline"
                      >
                        Delete
                      </button>
                      <button className="p-1">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 border-b">
              <div className="flex items-center gap-2 text-sm mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.14-3OOfluGiDPbF1IEfxBNU5Og5vNxc8U.png"
                  alt="Package"
                  width={40}
                  height={40}
                />
                <p>
                  All purchases made will arrive in our signature monochrome
                  packaging. You can also add a personalised card on your gifts.
                </p>
              </div>

              <div className="space-y-1 text-sm">
                <p>Free shipping in 2-7 business days</p>
                <p>Free online returns for 14 days</p>
                <p>Free exchange in store for 30 days</p>
                <button
                  onClick={() => setShowReturns(!showReturns)}
                  className="flex items-center text-sm mt-2"
                >
                  Learn more <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            {showReturns && <ReturnPolicy />}
          </div>

          <div className="p-4 border-t mt-auto">
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span className="font-medium">
                {totalPrice.toLocaleString()}د.إ
              </span>
            </div>
            <div className="space-y-2">
              <Link
                href="/checkout"
                className="block w-full bg-black text-white text-center py-3 px-4 rounded transition-colors hover:bg-gray-800"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/basket"
                className="block w-full text-center py-3 px-4 border border-black rounded hover:bg-gray-100 transition-colors"
              >
                View your basket
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ReturnPolicy() {
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-medium mb-4">Free returns</h3>
      <div className="space-y-4 text-sm">
        <div>
          <p className="mb-2">
            Free returns are available within 14 days of your online order
            delivery date.
          </p>
          <p>
            Please note that the items must be in re-saleable condition and that
            personalised items are non-exchangeable, non-refundable.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Free exchange in store</h4>
          <p>
            You can visit one of our retail stores within 30 days after the date
            of purchase using the delivery note included in the package.
          </p>
          <p>
            Exchanges cannot be made at franchise stores, outlets or department
            stores.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Store pick up</h4>
          <p>Select a LOEWE store to collect your order.</p>
          <p>
            You can see the complete list of stores where this service is
            available here.
          </p>
        </div>
      </div>
    </div>
  );
}
