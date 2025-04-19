"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  User,
  ShoppingBag,
  Search,
  Globe,
  ChevronDown,
} from "lucide-react";
import CartDrawer from "./cart/CartDrawer";
import Sidebar from "./Sidebar";
import { useCart } from "@/app/contexts/CartContext";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { totalItems, isCartOpen, openCart, closeCart } = useCart();

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="bg-background shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6 text-primary" />
          </button>
        </div>

        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-center absolute left-1/2 transform -translate-x-1/2 text-primary hover:text-secondary transition-colors duration-300"
        >
          MOIÉTOI
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="/contact"
            className="hidden sm:block text-primary hover:text-secondary transition-colors duration-300 text-sm"
          >
            Contactez-nous
          </Link>
          <button
            className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
            aria-label="User account"
          >
            <User className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={openCart}
            className="p-2 hover:bg-accent rounded-full relative transition-colors duration-300"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="h-6 w-6 text-primary" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-background text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
}
