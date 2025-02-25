// src/app/components/BasketPopup.tsx

import { X } from 'lucide-react';

interface BasketPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BasketPopup({ isOpen, onClose }: BasketPopupProps) {
  // Mock data for basket items and wishlist
  const basketItems = [
    { id: 1, name: 'Classic Tote', price: 299 },
    { id: 2, name: 'Elegant Clutch', price: 199 },
  ];

  const wishlistItems = [
    { id: 3, name: 'Leather Satchel', price: 349 },
    { id: 4, name: 'Mini Crossbody', price: 249 },
  ];

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Your Basket</h2>
        <ul className="space-y-2 mb-6">
          {basketItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mb-2">Wishlist</h3>
        <ul className="space-y-2">
          {wishlistItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}