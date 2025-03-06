// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Menu,
//   User,
//   ShoppingBag,
//   Search,
//   Globe,
//   ChevronDown,
// } from "lucide-react";
// import CartDrawer from "./cart/CartDrawer";
// import Sidebar from "./Sidebar";

// export default function Header() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [language, setLanguage] = useState("en");
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

//   const languages = [
//     { code: "en", name: "English" },
//     { code: "fr", name: "Français" },
//     { code: "ar", name: "العربية" },
//   ];

//   const handleLanguageChange = (langCode: string) => {
//     setLanguage(langCode);
//     setIsLanguageDropdownOpen(false);
//     // Here you would implement the actual language change logic
//   };

//   return (
//     <header className="bg-background shadow-md fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
//             aria-label="Menu"
//           >
//             <Menu className="h-6 w-6 text-primary" />
//           </button>
//           <div className="relative hidden sm:block">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="pl-8 pr-2 py-1 border border-accent rounded-full text-sm text-text placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
//           </div>
//         </div>

//         <Link
//           href="/"
//           className="text-2xl font-bold text-center absolute left-1/2 transform -translate-x-1/2 text-primary hover:text-secondary transition-colors duration-300"
//         >
//           MoiéToi
//         </Link>

//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <button
//               onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
//               className="flex items-center space-x-1 p-2 hover:bg-accent rounded-full transition-colors duration-300"
//               aria-label="Select language"
//             >
//               <Globe className="h-5 w-5 text-primary" />
//               <span className="text-primary text-sm">
//                 {language.toUpperCase()}
//               </span>
//               <ChevronDown className="h-4 w-4 text-primary" />
//             </button>
//             {isLanguageDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5">
//                 <div
//                   className="py-1"
//                   role="menu"
//                   aria-orientation="vertical"
//                   aria-labelledby="options-menu"
//                 >
//                   {languages.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className="block px-4 py-2 text-sm text-text hover:bg-accent hover:text-primary w-full text-left"
//                       role="menuitem"
//                     >
//                       {lang.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <Link
//             href="/contact"
//             className="text-primary hover:text-secondary transition-colors duration-300 text-sm"
//           >
//             Contact Us
//           </Link>
//           <button
//             className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
//             aria-label="User account"
//           >
//             <User className="h-6 w-6 text-primary" />
//           </button>
//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="p-2 hover:bg-accent rounded-full relative transition-colors duration-300"
//             aria-label="Shopping bag"
//           >
//             <ShoppingBag className="h-6 w-6 text-primary" />
//             <span className="absolute top-0 right-0 bg-secondary text-background text-xs rounded-full h-4 w-4 flex items-center justify-center">
//               2
//             </span>
//           </button>
//         </div>
//       </div>

//       <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//     </header>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Menu,
//   User,
//   ShoppingBag,
//   Search,
//   Globe,
//   ChevronDown,
// } from "lucide-react";
// import CartDrawer from "./cart/CartDrawer";
// import Sidebar from "./Sidebar";
// import { useCart } from "@/app/contexts/CartContext";

// export default function Header() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [language, setLanguage] = useState("en");
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
//   const { totalItems } = useCart();

//   const languages = [
//     { code: "en", name: "English" },
//     { code: "fr", name: "Français" },
//     { code: "ar", name: "العربية" },
//   ];

//   const handleLanguageChange = (langCode: string) => {
//     setLanguage(langCode);
//     setIsLanguageDropdownOpen(false);
//   };

//   return (
//     <header className="bg-background shadow-md fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
//             aria-label="Menu"
//           >
//             <Menu className="h-6 w-6 text-primary" />
//           </button>
//           <div className="relative hidden sm:block">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="pl-8 pr-2 py-1 border border-accent rounded-full text-sm text-text placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
//           </div>
//         </div>

//         <Link
//           href="/"
//           className="text-2xl font-bold text-center absolute left-1/2 transform -translate-x-1/2 text-primary hover:text-secondary transition-colors duration-300"
//         >
//           MoiéToi
//         </Link>

//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <button
//               onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
//               className="flex items-center space-x-1 p-2 hover:bg-accent rounded-full transition-colors duration-300"
//               aria-label="Select language"
//             >
//               <Globe className="h-5 w-5 text-primary" />
//               <span className="text-primary text-sm">
//                 {language.toUpperCase()}
//               </span>
//               <ChevronDown className="h-4 w-4 text-primary" />
//             </button>
//             {isLanguageDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5">
//                 <div
//                   className="py-1"
//                   role="menu"
//                   aria-orientation="vertical"
//                   aria-labelledby="options-menu"
//                 >
//                   {languages.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className="block px-4 py-2 text-sm text-text hover:bg-accent hover:text-primary w-full text-left"
//                       role="menuitem"
//                     >
//                       {lang.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <Link
//             href="/contact"
//             className="text-primary hover:text-secondary transition-colors duration-300 text-sm"
//           >
//             Contact Us
//           </Link>
//           <button
//             className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
//             aria-label="User account"
//           >
//             <User className="h-6 w-6 text-primary" />
//           </button>
//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="p-2 hover:bg-accent rounded-full relative transition-colors duration-300"
//             aria-label="Shopping bag"
//           >
//             <ShoppingBag className="h-6 w-6 text-primary" />
//             {totalItems > 0 && (
//               <span className="absolute top-0 right-0 bg-secondary text-background text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//     </header>
//   );
// }

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
          {/* <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-8 pr-2 py-1 border border-accent rounded-full text-sm text-text placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
          </div> */}
        </div>

        <Link
          href="/"
          className="text-2xl font-bold text-center absolute left-1/2 transform -translate-x-1/2 text-primary hover:text-secondary transition-colors duration-300"
        >
          MoiéToi
        </Link>

        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-1 p-2 hover:bg-accent rounded-full transition-colors duration-300"
              aria-label="Select language"
            >
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm">
                {language.toUpperCase()}
              </span>
              <ChevronDown className="h-4 w-4 text-primary" />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="block px-4 py-2 text-sm text-text hover:bg-accent hover:text-primary w-full text-left"
                      role="menuitem"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div> */}
          <Link
            href="/contact"
            className="text-primary hover:text-secondary transition-colors duration-300 text-sm"
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
