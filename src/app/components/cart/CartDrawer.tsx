"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Bookmark } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [showReturns, setShowReturns] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice, calculateTotal } =
    useCart();

  // Fallback to calculateTotal if totalPrice is undefined
  const displayPrice = totalPrice !== undefined ? totalPrice : calculateTotal();

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
            <h2 className="text-xl">Panier · {items.length}</h2>
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">Votre panier est vide</p>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="inline-block bg-black text-white px-4 py-2 rounded"
                >
                  Continuer vos achats
                </Link>
              </div>
            ) : (
              <>
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
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
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
                          {item.price.toLocaleString()} MAD
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm underline"
                          >
                            Supprimer
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
                  <div className="space-y-1 text-sm">
                    <p>Cher(e) client(e),</p>
                    <br />
                    <p>
                      Nous vous informons que nos livraisons sont effectuées
                      selon le planning suivant :
                    </p>
                    <br />
                    <p>Rabat et environs : chaque Mercredi et Samedi</p>
                    <p>Casablanca : uniquement le Samedi</p>
                    <p>
                      Merci de bien vouloir passer vos commandes en conséquence
                      afin de garantir leur livraison dans les meilleurs délais.
                    </p>
                  </div>
                </div>

                {showReturns && <ReturnPolicy />}
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t mt-auto">
              <div className="flex justify-between mb-4">
                <span>Sous-total</span>
                <span className="font-medium">
                  {displayPrice.toLocaleString()} MAD
                </span>
              </div>
              <div className="space-y-2">
                <Link
                  onClick={onClose}
                  href="/checkout"
                  className="block w-full bg-black text-white text-center py-3 px-4 rounded transition-colors hover:bg-gray-800"
                >
                  Passer à la caisse
                </Link>
                <Link
                  onClick={onClose}
                  href="/basket"
                  className="block w-full text-center py-3 px-4 border border-black rounded hover:bg-gray-100 transition-colors"
                >
                  Voir votre panier
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ReturnPolicy() {
  return (
    <div className="p-4 bg-gray-50">
      <h3 className="font-medium mb-4">Retours gratuits</h3>
      <div className="space-y-4 text-sm">
        <div>
          <p className="mb-2">
            Les retours gratuits sont disponibles dans les 14 jours suivant la
            date de livraison de votre commande en ligne.
          </p>
          <p>
            Veuillez noter que les articles doivent être en état de revente et
            que les articles personnalisés ne sont ni échangeables ni
            remboursables.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Échange gratuit en magasin</h4>
          <p>
            Vous pouvez visiter l'un de nos magasins dans les 30 jours suivant
            la date d'achat en présentant le bon de livraison inclus dans le
            colis.
          </p>
          <p>
            Les échanges ne peuvent pas être effectués dans les magasins
            franchisés, les outlets ou les grands magasins.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Retrait en magasin</h4>
          <p>Sélectionnez un magasin MOIÉTOI pour récupérer votre commande.</p>
          <p>
            Vous pouvez consulter la liste complète des magasins proposant ce
            service ici.
          </p>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Minus, Plus, X, Bookmark, ChevronDown } from "lucide-react";
// import { useCart } from "@/app/contexts/CartContext";
// import { useClickOutside } from "@/hooks/useClickOutside";

// interface CartDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
//   const [showReturns, setShowReturns] = useState(false);
//   const { items, removeItem, updateQuantity, totalPrice } = useCart();
//   const drawerRef = useClickOutside<HTMLDivElement>(onClose);

//   return (
//     <>
//       {/* Overlay that closes the drawer when clicked */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={onClose}
//           aria-hidden="true"
//         />
//       )}

//       <div
//         ref={drawerRef}
//         className={`fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="h-full flex flex-col">
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="text-xl">Panier · {items.length}</h2>
//             <button onClick={onClose} className="p-2">
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {items.length === 0 ? (
//               <div className="p-8 text-center">
//                 <p className="text-gray-500 mb-4">Votre panier est vide</p>
//                 <Link
//                   href="/shop"
//                   onClick={onClose}
//                   className="inline-block bg-black text-white px-4 py-2 rounded"
//                 >
//                   Continuer vos achats
//                 </Link>
//               </div>
//             ) : (
//               <>
//                 {items.map((item) => (
//                   <div key={item.id} className="p-4 border-b">
//                     <div className="flex gap-4">
//                       <Image
//                         src={item.imageUrl || "/placeholder.svg"}
//                         alt={item.name}
//                         width={100}
//                         height={100}
//                         className="object-cover rounded"
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-medium">{item.name}</h3>
//                         <div className="flex items-center mt-2 space-x-2">
//                           <button
//                             onClick={() =>
//                               updateQuantity(item.id, item.quantity - 1)
//                             }
//                             className="p-1 border rounded"
//                           >
//                             <Minus className="h-4 w-4" />
//                           </button>
//                           <span className="w-8 text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() =>
//                               updateQuantity(item.id, item.quantity + 1)
//                             }
//                             className="p-1 border rounded"
//                           >
//                             <Plus className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end gap-2">
//                         <span className="font-medium">
//                           {item.price.toLocaleString()} MAD
//                         </span>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => removeItem(item.id)}
//                             className="text-sm underline"
//                           >
//                             Supprimer
//                           </button>
//                           <button className="p-1">
//                             <Bookmark className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="p-4 border-b">
//                   <div className="space-y-1 text-sm">
//                     <p>Cher(e) client(e),</p>
//                     <br />
//                     <p>
//                       Nous vous informons que nos livraisons sont effectuées
//                       selon le planning suivant :
//                     </p>
//                     <br />
//                     <p>Rabat et environs : chaque Mercredi et Samedi</p>
//                     <p>Casablanca : uniquement le Samedi</p>
//                     <p>
//                       Merci de bien vouloir passer vos commandes en conséquence
//                       afin de garantir leur livraison dans les meilleurs délais.
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setShowReturns(!showReturns)}
//                   className="w-full p-4 flex items-center justify-between border-b"
//                 >
//                   <span className="font-medium">Politique de retour</span>
//                   <ChevronDown
//                     className={`h-5 w-5 transition-transform ${
//                       showReturns ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {showReturns && <ReturnPolicy />}
//               </>
//             )}
//           </div>

//           {items.length > 0 && (
//             <div className="p-4 border-t mt-auto">
//               <div className="flex justify-between mb-4">
//                 <span>Sous-total</span>
//                 <span className="font-medium">
//                   {totalPrice.toLocaleString()} MAD
//                 </span>
//               </div>
//               <div className="space-y-2">
//                 <Link
//                   onClick={onClose}
//                   href="/checkout"
//                   className="block w-full bg-black text-white text-center py-3 px-4 rounded transition-colors hover:bg-gray-800"
//                 >
//                   Passer à la caisse
//                 </Link>
//                 <Link
//                   onClick={onClose}
//                   href="/basket"
//                   className="block w-full text-center py-3 px-4 border border-black rounded hover:bg-gray-100 transition-colors"
//                 >
//                   Voir votre panier
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// function ReturnPolicy() {
//   return (
//     <div className="p-4 bg-gray-50">
//       <h3 className="font-medium mb-4">Retours gratuits</h3>
//       <div className="space-y-4 text-sm">
//         <div>
//           <p className="mb-2">
//             Les retours gratuits sont disponibles dans les 14 jours suivant la
//             date de livraison de votre commande en ligne.
//           </p>
//           <p>
//             Veuillez noter que les articles doivent être en état de revente et
//             que les articles personnalisés ne sont ni échangeables ni
//             remboursables.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-medium mb-2">Échange gratuit en magasin</h4>
//           <p>
//             Vous pouvez visiter l'un de nos magasins dans les 30 jours suivant
//             la date d'achat en présentant le bon de livraison inclus dans le
//             colis.
//           </p>
//           <p>
//             Les échanges ne peuvent pas être effectués dans les magasins
//             franchisés, les outlets ou les grands magasins.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-medium mb-2">Retrait en magasin</h4>
//           <p>Sélectionnez un magasin MOIÉTOI pour récupérer votre commande.</p>
//           <p>
//             Vous pouvez consulter la liste complète des magasins proposant ce
//             service ici.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
