// "use client";

// import type React from "react";
// import Image from "next/image";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Star,
//   Truck,
//   Heart,
//   ChevronRight,
//   ChevronLeft,
//   Check,
//   Minus,
//   Plus,
// } from "lucide-react";
// import type { Product } from "@/lib/types";
// import { useCart } from "@/app/contexts/CartContext";

// export default function ProductDetails({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isWishlist, setIsWishlist] = useState(false);
//   const [showZoom, setShowZoom] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const router = useRouter();
//   const { addItem } = useCart();

//   const [isLoading, setIsLoading] = useState(true);

//   const allImages = [product.imageUrl, ...product.images.map((img) => img.url)];
//   const discountPercentage = Math.round(
//     ((product.originalPrice - product.price) / product.originalPrice) * 100
//   );

//   const handleQuantityChange = (newQuantity: number) => {
//     setQuantity(Math.max(1, newQuantity));
//   };

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: quantity,
//       imageUrl: product.imageUrl,
//     });
//   };

//   const handleBuyNow = (e: React.MouseEvent) => {
//     e.preventDefault();
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: quantity,
//       imageUrl: product.imageUrl,
//     });
//     router.push("/checkout");
//   };

//   const handleImageClick = (index: number, e: React.MouseEvent) => {
//     e.preventDefault();
//     setCurrentImageIndex(index);
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === allImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? allImages.length - 1 : prev - 1
//     );
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!showZoom) return;

//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;

//     setZoomPosition({ x, y });
//   };

//   return (
//     <div className="bg-[#f8f7f5]">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:py-20 sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
//           {/* Image gallery */}
//           <div className="lg:col-span-7 flex flex-col">
//             <div className="relative w-full aspect-[4/5] mb-6 bg-white rounded-xl overflow-hidden shadow-sm">
//               <div
//                 className="relative w-full h-full cursor-zoom-in"
//                 onClick={() => setShowZoom(!showZoom)}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={() => setShowZoom(false)}
//               >
//                 <Image
//                   src={allImages[currentImageIndex] || "/placeholder.svg"}
//                   alt={product.name}
//                   className="w-full h-full object-center object-cover transition-transform duration-500"
//                   style={
//                     showZoom
//                       ? {
//                           transform: "scale(1.5)",
//                           transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                         }
//                       : {}
//                   }
//                   fill
//                   priority
//                 />
//               </div>

//               {/* Navigation arrows */}
//               <button
//                 onClick={handlePrevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft className="h-6 w-6 text-gray-800" />
//               </button>
//               <button
//                 onClick={handleNextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
//                 aria-label="Next image"
//               >
//                 <ChevronRight className="h-6 w-6 text-gray-800" />
//               </button>
//             </div>

//             <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
//               {allImages.map((img, index) => (
//                 <button
//                   key={index}
//                   className={`flex-shrink-0 transition-all duration-200 ${
//                     index === currentImageIndex
//                       ? "ring-2 ring-black opacity-100 scale-105"
//                       : "opacity-70 hover:opacity-100"
//                   }`}
//                   onClick={(e) => handleImageClick(index, e)}
//                 >
//                   <div className="relative w-20 h-24 bg-white rounded-lg overflow-hidden shadow-sm">
//                     <Image
//                       src={img || "/placeholder.svg"}
//                       alt={`${product.name} - Image ${index + 1}`}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product info */}
//           <div className="mt-10 lg:mt-0 lg:col-span-5">
//             <div className="space-y-8">
//               {/* Brand and title */}
//               <div>
//                 <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2 font-medium">
//                   {product.category?.name || ""}
//                 </h2>
//                 <h1 className="text-3xl font-light text-gray-900 tracking-wide">
//                   {product.name}
//                 </h1>
//               </div>

//               {/* Price */}
//               <div className="flex items-baseline space-x-4">
//                 <p className="text-3xl font-light text-gray-900">
//                   {product.price.toLocaleString()} MAD
//                 </p>
//                 {product.originalPrice > product.price && (
//                   <>
//                     <p className="text-lg text-gray-500 line-through">
//                       {product.originalPrice.toLocaleString()} MAD
//                     </p>
//                     <div className="px-2 py-1 bg-red-50 text-red-700 text-sm font-medium rounded">
//                       -{discountPercentage}%
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Rating */}
//               <div className="flex items-center space-x-2">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${
//                         i < Math.floor(product.rating || 5)
//                           ? "text-amber-400"
//                           : "text-gray-300"
//                       }`}
//                       fill={
//                         i < Math.floor(product.rating || 5)
//                           ? "currentColor"
//                           : "none"
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-gray-600">
//                   {product.rating || 5} ({product.reviews || 24} reviews)
//                 </span>
//               </div>

//               {/* Description */}
//               <div className="border-t border-b border-gray-200 py-6">
//                 <p className="text-base text-gray-700 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>

//               {/* Color */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
//                   Couleur
//                 </h3>
//                 <div className="flex items-center space-x-3">
//                   <div
//                     className="w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center ring-2 ring-black"
//                     style={{ backgroundColor: product.color }}
//                   >
//                     <Check className="h-4 w-4 text-white" />
//                   </div>
//                   <span className="text-sm text-gray-700 capitalize">
//                     {product.color}
//                   </span>
//                 </div>
//               </div>

//               {/* Size */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
//                   Taille
//                 </h3>
//                 <div className="inline-block px-4 py-2 border-2 border-black rounded-md text-sm font-medium">
//                   {product.size}
//                 </div>
//               </div>

//               {/* Quantity */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
//                   Quantité
//                 </h3>
//                 <div className="flex items-center border-2 border-gray-300 rounded-md w-32">
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleQuantityChange(quantity - 1);
//                     }}
//                     className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black"
//                     aria-label="Decrease quantity"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <input
//                     type="number"
//                     id="quantity"
//                     name="quantity"
//                     min="1"
//                     value={quantity}
//                     onChange={(e) =>
//                       handleQuantityChange(Number(e.target.value))
//                     }
//                     className="w-12 h-10 text-center border-0 focus:ring-0 text-gray-900"
//                   />
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleQuantityChange(quantity + 1);
//                     }}
//                     className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black"
//                     aria-label="Increase quantity"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Shipping */}
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <Truck className="h-5 w-5 text-gray-700" />
//                   <span className="font-medium text-gray-900">
//                     Livraison Premium Gratuite
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 ml-8">
//                   Livraison estimée : 2 à 4 jours ouvrés
//                 </p>
//               </div>

//               {/* Actions */}
//               <div className="flex flex-col space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={handleAddToCart}
//                     className="bg-white border-2 border-black text-black py-3 px-6 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium tracking-wide"
//                   >
//                     Ajouter au panier
//                   </button>
//                   <button
//                     onClick={handleBuyNow}
//                     className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium tracking-wide"
//                   >
//                     Acheter maintenant
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setIsWishlist(!isWishlist)}
//                   className="flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <Heart
//                     className={`h-5 w-5 ${
//                       isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
//                     }`}
//                   />
//                   <span className="font-medium text-gray-900">
//                     {isWishlist
//                       ? "Enregistré dans la liste de souhaits"
//                       : "Ajouter à la liste de souhaits"}
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  Truck,
  Heart,
  ChevronRight,
  ChevronLeft,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/app/contexts/CartContext";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { addItem } = useCart();

  // Simulate loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // If still loading, show skeleton
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  const allImages = [product.imageUrl, ...product.images.map((img) => img.url)];
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    });
    router.push("/checkout");
  };

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="bg-[#f8f7f5]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-20 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Image gallery */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full aspect-[4/5] mb-6 bg-white rounded-xl overflow-hidden shadow-sm">
              <div
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setShowZoom(!showZoom)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setShowZoom(false)}
              >
                <Image
                  src={allImages[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-center object-cover transition-transform duration-500"
                  style={
                    showZoom
                      ? {
                          transform: "scale(1.5)",
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : {}
                  }
                  fill
                  priority
                />
              </div>

              {/* Navigation arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </div>

            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 transition-all duration-200 ${
                    index === currentImageIndex
                      ? "ring-2 ring-black opacity-100 scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={(e) => handleImageClick(index, e)}
                >
                  <div className="relative w-20 h-24 bg-white rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="space-y-8">
              {/* Brand and title */}
              <div>
                <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2 font-medium">
                  {product.category?.name || ""}
                </h2>
                <h1 className="text-3xl font-light text-gray-900 tracking-wide">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-4">
                <p className="text-3xl font-light text-gray-900">
                  {product.price.toLocaleString()} MAD
                </p>
                {product.originalPrice > product.price && (
                  <>
                    <p className="text-lg text-gray-500 line-through">
                      {product.originalPrice.toLocaleString()} MAD
                    </p>
                    <div className="px-2 py-1 bg-red-50 text-red-700 text-sm font-medium rounded">
                      -{discountPercentage}%
                    </div>
                  </>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 5)
                          ? "text-amber-400"
                          : "text-gray-300"
                      }`}
                      fill={
                        i < Math.floor(product.rating || 5)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating || 5} ({product.reviews || 24} reviews)
                </span>
              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-200 py-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Couleur
                </h3>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center ring-2 ring-black"
                    style={{ backgroundColor: product.color }}
                  >
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 capitalize">
                    {product.color}
                  </span>
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Taille
                </h3>
                <div className="inline-block px-4 py-2 border-2 border-black rounded-md text-sm font-medium">
                  {product.size}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Quantité
                </h3>
                <div className="flex items-center border-2 border-gray-300 rounded-md w-32">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuantityChange(quantity - 1);
                    }}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    className="w-12 h-10 text-center border-0 focus:ring-0 text-gray-900"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuantityChange(quantity + 1);
                    }}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Truck className="h-5 w-5 text-gray-700" />
                  <span className="font-medium text-gray-900">
                    Livraison Premium Gratuite
                  </span>
                </div>
                <p className="text-sm text-gray-600 ml-8">
                  Livraison estimée : 2 à 4 jours ouvrés
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-white border-2 border-black text-black py-3 px-6 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium tracking-wide"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium tracking-wide"
                  >
                    Acheter maintenant
                  </button>
                </div>

                <button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className="flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                  <span className="font-medium text-gray-900">
                    {isWishlist
                      ? "Enregistré dans la liste de souhaits"
                      : "Ajouter à la liste de souhaits"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
