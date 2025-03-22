"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Bookmark } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";

export default function BasketPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-2xl font-medium mb-8">Basket · {items.length}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="border-b pb-6">
              <div className="flex gap-4">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded"
                />
                <div className="flex-1">
                  <h2 className="font-medium">{item.name}</h2>
                  <div className="flex items-center mt-4 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                    <button>
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:pl-8">
          <div className="bg-gray-50 p-6 rounded sticky top-4">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{totalPrice.toLocaleString()} MAD</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Taxes et droits</span>
                <span>Inclus</span>
              </div> */}
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>Gratuit</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-4 border-t">
                <span>Total</span>
                <span>{totalPrice.toLocaleString()} MAD</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-3 px-4 rounded transition-colors hover:bg-gray-800 mb-4"
            >
              Passer à la caisse
            </Link>

            <div className="space-y-6">
              {/* <div className="flex items-center gap-4 p-4 bg-white rounded">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.14-3OOfluGiDPbF1IEfxBNU5Og5vNxc8U.png"
                  alt="Package"
                  width={40}
                  height={40}
                />
                <div className="text-sm">
                  <h3 className="font-medium mb-1">Emballage signature</h3>
                  <p>
                    Tous les achats seront emballés dans notre packaging
                    signature.
                  </p>
                </div>
              </div> */}

              {/* <div className="flex items-center gap-4 p-4 bg-white rounded">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.14-3OOfluGiDPbF1IEfxBNU5Og5vNxc8U.png"
                  alt="Message"
                  width={40}
                  height={40}
                />
                <div className="text-sm">
                  <h3 className="font-medium mb-1">Message personnalisé</h3>
                  <p>Ajoutez une carte personnalisée à vos cadeaux.</p>
                </div>
              </div> */}

              <div>
                <h3 className="font-medium mb-2">Besoin d'aide ?</h3>
                <p className="text-sm mb-1">+212 663777275</p>
                <p className="text-sm mb-1">
                  Appelez-nous de 9h à 18h (heure de Rabat), du lundi au samedi.{" "}
                </p>
                <a
                  href="mailto:clientservices_eu@moietoi.com"
                  className="text-sm underline"
                >
                  sacmoietoi@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
