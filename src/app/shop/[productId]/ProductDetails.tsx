// "use client";

// import type React from "react";
// import Image from "next/image";
// import { useState, useEffect } from "react";
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
// import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

// export default function ProductDetails({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isWishlist, setIsWishlist] = useState(false);
//   const [showZoom, setShowZoom] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   const { addItem } = useCart();

//   // Simulate loading state for demonstration
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // If still loading, show skeleton
//   if (isLoading) {
//     return <ProductDetailsSkeleton />;
//   }

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
//       color: product.color, // Add this line
//       size: product.size, // Add this line
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
//       color: product.color, // Add this line
//       size: product.size, // Add this line
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
//                   className="w-full h-full object-center object-contain transition-transform duration-500"
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
//                     Livraison Gratuite
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 ml-8">
//                   Cher(e) client(e),
//                   <br /> Nous vous informons que nos livraisons sont effectuées
//                   selon le planning suivant :<br /> Rabat et environs : chaque
//                   Mercredi et Samedi <br />
//                   Casablanca : uniquement le Samedi <br />
//                   Merci de bien vouloir passer vos commandes en conséquence afin
//                   de garantir leur livraison dans les meilleurs délais.
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

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Heart,
//   ShoppingBag,
//   Truck,
//   Minus,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { Product } from "@/lib/types";
// import { useCart } from "@/app/contexts/CartContext";
// import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

// export default function ProductDetails({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isWishlist, setIsWishlist] = useState(false);

//   const router = useRouter();
//   const { addItem } = useCart();

//   const allImages = [product.imageUrl, ...product.images.map((img) => img.url)];

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddToCart = () => {
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       imageUrl: product.imageUrl,
//       color: product.color,
//       size: product.size,
//     });
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     router.push("/checkout");
//   };

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
//   const increaseQuantity = () => setQuantity(quantity + 1);

//   const goToPrevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? allImages.length - 1 : prev - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === allImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   if (isLoading) return <ProductDetailsSkeleton />;

//   return (
//     <div className="container mx-auto px-4 py-24">
//       <div className="text-sm breadcrumbs mb-6">
//         <ul className="flex gap-2 text-muted-foreground">
//           <li>
//             <Link href="/">Accueil</Link> /
//           </li>
//           <li>
//             <Link href="/shop">Produits</Link> /
//           </li>
//           <li className="text-foreground font-medium">{product.name}</li>
//         </ul>
//       </div>

//       <div className="grid md:grid-cols-2 gap-12">
//         {/* Image gallery */}
//         {/* <div className="space-y-4">
//           <div className="aspect-square overflow-hidden rounded-lg border">
//             <Image
//               src={allImages[currentImageIndex] || "/placeholder.svg"}
//               alt={product.name}
//               className="w-full h-full object-cover"
//               width={600}
//               height={600}
//             />
//           </div>
//           <div className="grid grid-cols-4 gap-4">
//             {allImages.map((image, index) => (
//               <button key={index} onClick={() => setCurrentImageIndex(index)}>
//                 <div
//                   className={`aspect-square overflow-hidden rounded-lg border ${
//                     currentImageIndex === index ? "ring-2 ring-black" : ""
//                   }`}
//                 >
//                   <Image
//                     src={image || "/placeholder.svg"}
//                     alt={`${product.name} view ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div> */}
//         <div className="space-y-3 md:space-y-6">
//           <div className="aspect-square overflow-hidden rounded-lg md:rounded-xl border border-gray-200 relative group">
//             <Image
//               src={allImages[currentImageIndex] || "/placeholder.svg"}
//               alt={product.name}
//               className="w-full h-full object-cover product-image-zoom"
//               width={800}
//               height={800}
//               priority
//             />
//             <button
//               onClick={goToPrevImage}
//               className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
//               aria-label="Previous image"
//             >
//               <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
//             </button>
//             <button
//               onClick={goToNextImage}
//               className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
//               aria-label="Next image"
//             >
//               <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
//             </button>
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
//               {allImages.map((_, index) => (
//                 <button
//                   key={`indicator-${index}`}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`w-2 h-2 rounded-full ${
//                     currentImageIndex === index ? "bg-black" : "bg-gray-300"
//                   }`}
//                   aria-label={`Go to image ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="relative px-2 md:px-4">
//             <div className="overflow-x-auto pb-2 hide-scrollbar">
//               <div className="flex gap-2 md:gap-3 min-w-max justify-center">
//                 {allImages.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className="focus:outline-none"
//                   >
//                     <div
//                       className={`aspect-square w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden rounded-lg border transition-all ${
//                         currentImageIndex === index
//                           ? "thumbnail-active"
//                           : "border-gray-200 hover:border-gray-400"
//                       }`}
//                     >
//                       <Image
//                         src={image || "/placeholder.svg"}
//                         alt={`${product.name} view ${index + 1}`}
//                         width={100}
//                         height={100}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//           <div className="flex gap-4 items-center mb-6">
//             <p className="text-2xl">{product.price.toLocaleString()} MAD</p>
//             {product.originalPrice > product.price && (
//               <>
//                 <p className="line-through text-muted-foreground">
//                   {product.originalPrice.toLocaleString()} MAD
//                 </p>
//                 <div className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
//                   -
//                   {Math.round(
//                     ((product.originalPrice - product.price) /
//                       product.originalPrice) *
//                       100
//                   )}
//                   %
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Color</h3>
//             <div className="flex items-center gap-2">
//               <div
//                 className="w-6 h-6 rounded-full border shadow"
//                 style={{ backgroundColor: product.color }}
//               />
//               <span className="text-sm text-muted-foreground capitalize">
//                 {product.color}
//               </span>
//             </div>
//           </div>

//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Size</h3>
//             <div className="inline-block px-3 py-1 border text-sm rounded-md">
//               {product.size}
//             </div>
//           </div>

//           <div className="mb-6">
//             <h3 className="font-medium mb-2">Quantity</h3>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={decreaseQuantity}
//                 disabled={quantity <= 1}
//                 className="w-10 h-10 border rounded hover:bg-gray-100"
//               >
//                 <Minus className="h-4 w-4 mx-auto" />
//               </button>
//               <span className="w-8 text-center">{quantity}</span>
//               <button
//                 onClick={increaseQuantity}
//                 className="w-10 h-10 border rounded hover:bg-gray-100"
//               >
//                 <Plus className="h-4 w-4 mx-auto" />
//               </button>
//             </div>
//           </div>

//           {/* <div className="flex gap-4 mb-8"> */}
//           <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2">
//             {/* <button
//               onClick={handleAddToCart}
//               className="flex-1 py-3 px-4 bg-black text-white rounded hover:bg-gray-800 flex items-center justify-center"
//             >
//               <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
//             </button> */}
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 bg-black text-white rounded-full hover:bg-gray-800 flex items-center justify-center elegant-button font-medium text-sm sm:text-base"
//             >
//               <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Ajouter au
//               panier
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300 font-medium elegant-button text-sm sm:text-base"
//             >
//               Acheter maintenant
//             </button>
//             {/* <button
//               onClick={() => setIsWishlist(!isWishlist)}
//               className="p-3 border rounded hover:bg-gray-100"
//             >
//               <Heart
//                 className={`h-5 w-5 ${
//                   isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
//                 }`}
//               />
//             </button> */}
//           </div>

//           <div className="bg-muted/40 p-4 rounded-lg mb-8 text-sm">
//             <div className="flex items-center gap-3">
//               <Truck className="h-5 w-5" />
//               Livraison Gratuite dans certaines villes. Consultez les détails.
//             </div>
//           </div>

//           <Tabs defaultValue="description">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="description">Description</TabsTrigger>
//               <TabsTrigger value="details">Détails</TabsTrigger>
//               <TabsTrigger value="shipping">Livraison</TabsTrigger>
//             </TabsList>
//             <TabsContent
//               value="description"
//               className="pt-4 text-muted-foreground"
//             >
//               {product.description}
//             </TabsContent>
//             <TabsContent value="details" className="pt-4 text-muted-foreground">
//               <ul className="list-disc pl-5 space-y-1">
//                 <li>Nom: {product.name}</li>
//                 <li>Catégorie: {product.category?.name}</li>
//                 <li>Évaluation: {product.rating || 5} étoiles</li>
//               </ul>
//             </TabsContent>
//             <TabsContent
//               value="shipping"
//               className="pt-4 text-muted-foreground"
//             >
//               Livraison Rabat : Mer & Sam. Casablanca : Samedi uniquement.
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Heart,
//   ShoppingBag,
//   Truck,
//   Minus,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { Product } from "@/lib/types";
// import { useCart } from "@/app/contexts/CartContext";
// import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

// // Add this style to the component
// const hideScrollbarStyle = `
//   .hide-scrollbar::-webkit-scrollbar {
//     display: none;
//   }
//   .hide-scrollbar {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
// `;

// export default function ProductDetails({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isWishlist, setIsWishlist] = useState(false);

//   const router = useRouter();
//   const { addItem } = useCart();

//   const allImages = [product.imageUrl, ...product.images.map((img) => img.url)];

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddToCart = () => {
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       imageUrl: product.imageUrl,
//       color: product.color,
//       size: product.size,
//     });
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     router.push("/checkout");
//   };

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
//   const increaseQuantity = () => setQuantity(quantity + 1);

//   const goToPrevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? allImages.length - 1 : prev - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === allImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   if (isLoading) return <ProductDetailsSkeleton />;

//   return (
//     <>
//       <style jsx global>
//         {hideScrollbarStyle}
//       </style>
//       <div className="container mx-auto px-4 py-24">
//         <div className="text-sm breadcrumbs mb-6">
//           <ul className="flex gap-2 text-muted-foreground">
//             <li>
//               <Link href="/">Home</Link> /
//             </li>
//             <li>
//               <Link href="/products">Products</Link> /
//             </li>
//             <li className="text-foreground font-medium">{product.name}</li>
//           </ul>
//         </div>

//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Image gallery */}
//           <div className="space-y-4">
//             <div className="aspect-square overflow-hidden rounded-lg border relative">
//               <Image
//                 src={allImages[currentImageIndex] || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//                 width={600}
//                 height={600}
//               />
//               <button
//                 onClick={goToPrevImage}
//                 className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white"
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </button>
//               <button
//                 onClick={goToNextImage}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white"
//                 aria-label="Next image"
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="relative">
//               <div className="overflow-x-auto pb-2 hide-scrollbar">
//                 <div className="flex gap-4 min-w-max">
//                   {allImages.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                     >
//                       <div
//                         className={`aspect-square w-20 h-20 overflow-hidden rounded-lg border ${
//                           currentImageIndex === index ? "ring-2 ring-black" : ""
//                         }`}
//                       >
//                         <Image
//                           src={image || "/placeholder.svg"}
//                           alt={`${product.name} view ${index + 1}`}
//                           width={100}
//                           height={100}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//             <div className="flex gap-4 items-center mb-6">
//               <p className="text-2xl">{product.price.toLocaleString()} MAD</p>
//               {product.originalPrice > product.price && (
//                 <>
//                   <p className="line-through text-muted-foreground">
//                     {product.originalPrice.toLocaleString()} MAD
//                   </p>
//                   <div className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
//                     -
//                     {Math.round(
//                       ((product.originalPrice - product.price) /
//                         product.originalPrice) *
//                         100
//                     )}
//                     %
//                   </div>
//                 </>
//               )}
//             </div>

//             <div className="mb-6">
//               <h3 className="font-medium mb-2">Color</h3>
//               <div className="flex items-center gap-2">
//                 <div
//                   className="w-6 h-6 rounded-full border shadow"
//                   style={{ backgroundColor: product.color }}
//                 />
//                 <span className="text-sm text-muted-foreground capitalize">
//                   {product.color}
//                 </span>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-medium mb-2">Size</h3>
//               <div className="inline-block px-3 py-1 border text-sm rounded-md">
//                 {product.size}
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-medium mb-2">Quantity</h3>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={decreaseQuantity}
//                   disabled={quantity <= 1}
//                   className="w-10 h-10 border rounded hover:bg-gray-100"
//                 >
//                   <Minus className="h-4 w-4 mx-auto" />
//                 </button>
//                 <span className="w-8 text-center">{quantity}</span>
//                 <button
//                   onClick={increaseQuantity}
//                   className="w-10 h-10 border rounded hover:bg-gray-100"
//                 >
//                   <Plus className="h-4 w-4 mx-auto" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex gap-4 mb-8">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 py-3 px-4 bg-black text-white rounded hover:bg-gray-800 flex items-center justify-center"
//               >
//                 <ShoppingBag className="mr-2 h-5 w-5" /> Ajouter au panier
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium tracking-wide"
//               >
//                 Acheter maintenant
//               </button>
//               <button
//                 onClick={() => setIsWishlist(!isWishlist)}
//                 className="p-3 border rounded hover:bg-gray-100"
//               >
//                 <Heart
//                   className={`h-5 w-5 ${
//                     isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="bg-muted/40 p-4 rounded-lg mb-8 text-sm">
//               <div className="flex items-center gap-3">
//                 <Truck className="h-5 w-5" />
//                 Livraison Gratuite dans certaines villes. Consultez les détails.
//               </div>
//             </div>

//             <Tabs defaultValue="description">
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="details">Détails</TabsTrigger>
//                 <TabsTrigger value="shipping">Livraison</TabsTrigger>
//               </TabsList>
//               <TabsContent
//                 value="description"
//                 className="pt-4 text-muted-foreground"
//               >
//                 {product.description}
//               </TabsContent>
//               <TabsContent
//                 value="details"
//                 className="pt-4 text-muted-foreground"
//               >
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Nom: {product.name}</li>
//                   <li>Catégorie: {product.category?.name}</li>
//                   <li>Évaluation: {product.rating || 5} étoiles</li>
//                 </ul>
//               </TabsContent>
//               <TabsContent
//                 value="shipping"
//                 className="pt-4 text-muted-foreground"
//               >
//                 Livraison Rabat : Mer & Sam. Casablanca : Samedi uniquement.
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Heart,
//   ShoppingBag,
//   Truck,
//   Minus,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { Product } from "@/lib/types";
// import { useCart } from "@/app/contexts/CartContext";
// import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

// // Replace the hideScrollbarStyle with this enhanced version
// const hideScrollbarStyle = `
//   .hide-scrollbar::-webkit-scrollbar {
//     display: none;
//   }
//   .hide-scrollbar {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }

//   .product-image-zoom {
//     transition: transform 0.3s ease;
//   }

//   .product-image-zoom:hover {
//     transform: scale(1.05);
//   }

//   .thumbnail-active {
//     border-color: #000;
//     box-shadow: 0 0 0 2px #000;
//   }

//   .elegant-button {
//     transition: all 0.3s ease;
//   }

//   .elegant-button:hover {
//     transform: translateY(-2px);
//   }
// `;

// export default function ProductDetails({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isWishlist, setIsWishlist] = useState(false);

//   const router = useRouter();
//   const { addItem } = useCart();

//   const allImages = [product.imageUrl, ...product.images.map((img) => img.url)];

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddToCart = () => {
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       imageUrl: product.imageUrl,
//       color: product.color,
//       size: product.size,
//     });
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     router.push("/checkout");
//   };

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
//   const increaseQuantity = () => setQuantity(quantity + 1);

//   const goToPrevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? allImages.length - 1 : prev - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === allImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   if (isLoading) return <ProductDetailsSkeleton />;

//   // Replace the return statement with this enhanced version
//   return (
//     <>
//       <style jsx global>
//         {hideScrollbarStyle}
//       </style>
//       <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
//         <div className="text-sm breadcrumbs mb-8">
//           <ul className="flex gap-2 text-muted-foreground">
//             <li>
//               <Link href="/" className="hover:text-black transition-colors">
//                 Home
//               </Link>{" "}
//               /
//             </li>
//             <li>
//               <Link
//                 href="/products"
//                 className="hover:text-black transition-colors"
//               >
//                 Bags
//               </Link>{" "}
//               /
//             </li>
//             <li className="text-foreground font-medium">{product.name}</li>
//           </ul>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
//           {/* Image gallery */}
//           <div className="space-y-6">
//             <div className="aspect-square overflow-hidden rounded-xl border border-gray-200 relative group">
//               <Image
//                 src={allImages[currentImageIndex] || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-full object-cover product-image-zoom"
//                 width={800}
//                 height={800}
//                 priority
//               />
//               <button
//                 onClick={goToPrevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={goToNextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
//                 aria-label="Next image"
//               >
//                 <ChevronRight className="h-5 w-5" />
//               </button>
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
//                 {allImages.map((_, index) => (
//                   <button
//                     key={`indicator-${index}`}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`w-2 h-2 rounded-full ${
//                       currentImageIndex === index ? "bg-black" : "bg-gray-300"
//                     }`}
//                     aria-label={`Go to image ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="relative px-4">
//               <div className="overflow-x-auto pb-2 hide-scrollbar">
//                 <div className="flex gap-3 min-w-max justify-center">
//                   {allImages.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className="focus:outline-none"
//                     >
//                       <div
//                         className={`aspect-square w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg border transition-all ${
//                           currentImageIndex === index
//                             ? "thumbnail-active"
//                             : "border-gray-200 hover:border-gray-400"
//                         }`}
//                       >
//                         <Image
//                           src={image || "/placeholder.svg"}
//                           alt={`${product.name} view ${index + 1}`}
//                           width={100}
//                           height={100}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="flex flex-col justify-center">
//             <div className="space-y-8">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
//                   {product.name}
//                 </h1>
//                 <div className="flex items-center gap-4 mb-4">
//                   <p className="text-2xl md:text-3xl font-semibold">
//                     {product.price.toLocaleString()} MAD
//                   </p>
//                   {product.originalPrice > product.price && (
//                     <>
//                       <p className="line-through text-muted-foreground">
//                         {product.originalPrice.toLocaleString()} MAD
//                       </p>
//                       <div className="bg-red-50 text-red-600 text-sm px-3 py-1 rounded-full font-medium">
//                         {Math.round(
//                           ((product.originalPrice - product.price) /
//                             product.originalPrice) *
//                             100
//                         )}
//                         % OFF
//                       </div>
//                     </>
//                   )}
//                 </div>
//                 <div className="h-px bg-gray-200 w-full my-6"></div>
//               </div>

//               <div className="grid gap-6">
//                 <div>
//                   <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">
//                     Color
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="w-8 h-8 rounded-full border shadow-sm ring-2 ring-offset-2 ring-black"
//                       style={{ backgroundColor: product.color }}
//                     />
//                     <span className="text-sm capitalize">{product.color}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">
//                     Size
//                   </h3>
//                   <div className="inline-block px-4 py-2 border border-black text-sm rounded-md font-medium">
//                     {product.size}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">
//                     Quantity
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={decreaseQuantity}
//                       disabled={quantity <= 1}
//                       className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </button>
//                     <span className="w-10 text-center font-medium">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={increaseQuantity}
//                       className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 mt-2">
//                 <button
//                   onClick={handleAddToCart}
//                   className="flex-1 py-3.5 px-6 bg-black text-white rounded-full hover:bg-gray-800 flex items-center justify-center elegant-button font-medium"
//                 >
//                   <ShoppingBag className="mr-2 h-5 w-5" /> Ajouter au panier
//                 </button>
//                 <button
//                   onClick={handleBuyNow}
//                   className="flex-1 py-3.5 px-6 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300 font-medium elegant-button"
//                 >
//                   Acheter maintenant
//                 </button>
//                 {/* <button
//                   onClick={() => setIsWishlist(!isWishlist)}
//                   className="p-3.5 border-2 border-gray-200 rounded-full hover:border-gray-400 transition-colors"
//                   aria-label="Add to wishlist"
//                 >
//                   <Heart
//                     className={`h-5 w-5 ${
//                       isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
//                     }`}
//                   />
//                 </button> */}
//               </div>

//               <div className="bg-gray-50 p-5 rounded-xl mt-2">
//                 <div className="flex items-center gap-3">
//                   <Truck className="h-5 w-5 text-gray-700" />
//                   <p className="text-sm text-gray-700">
//                     Livraison Gratuite dans certaines villes.{" "}
//                     <span className="underline font-medium">
//                       Consultez les détails
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               <Tabs defaultValue="description" className="mt-4">
//                 <TabsList className="grid w-full grid-cols-3 rounded-xl bg-gray-100 p-1">
//                   <TabsTrigger
//                     value="description"
//                     className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Description
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="details"
//                     className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Détails
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="shipping"
//                     className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Livraison
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent
//                   value="description"
//                   className="pt-6 text-gray-600 leading-relaxed"
//                 >
//                   {product.description}
//                 </TabsContent>
//                 <TabsContent value="details" className="pt-6 text-gray-600">
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Nom:{" "}
//                         <span className="font-medium text-black">
//                           {product.name}
//                         </span>
//                       </span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Catégorie:{" "}
//                         <span className="font-medium text-black">
//                           {product.category?.name}
//                         </span>
//                       </span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Évaluation:{" "}
//                         <span className="font-medium text-black">
//                           {product.rating || 5} étoiles
//                         </span>
//                       </span>
//                     </li>
//                   </ul>
//                 </TabsContent>
//                 <TabsContent value="shipping" className="pt-6 text-gray-600">
//                   <div className="space-y-4">
//                     <p className="font-medium text-black">
//                       Délais de livraison:
//                     </p>
//                     <ul className="space-y-2">
//                       <li className="flex items-center gap-2">
//                         <span className="w-2 h-2 bg-black rounded-full"></span>
//                         <span>
//                           Rabat:{" "}
//                           <span className="font-medium text-black">
//                             Mercredi & Samedi
//                           </span>
//                         </span>
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <span className="w-2 h-2 bg-black rounded-full"></span>
//                         <span>
//                           Casablanca:{" "}
//                           <span className="font-medium text-black">
//                             Samedi uniquement
//                           </span>
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Heart,
//   ShoppingBag,
//   Truck,
//   Minus,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { Product } from "@/lib/types";
// import { useCart } from "@/app/contexts/CartContext";
// import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

// // Replace the hideScrollbarStyle with this enhanced version
// const hideScrollbarStyle = `
//   .hide-scrollbar::-webkit-scrollbar {
//     display: none;
//   }
//   .hide-scrollbar {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }

//   .product-image-zoom {
//     transition: transform 0.3s ease;
//   }

//   .product-image-zoom:hover {
//     transform: scale(1.05);
//   }

//   .thumbnail-active {
//     border-color: #000;
//     box-shadow: 0 0 0 2px #000;
//   }

//   .elegant-button {
//     transition: all 0.3s ease;
//   }

//   .elegant-button:hover {
//     transform: translateY(-2px);
//   }
// `;

// export default function ProductDetails({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isWishlist, setIsWishlist] = useState(false);

//   const router = useRouter();
//   const { addItem } = useCart();

//   const allImages = [product.imageUrl, ...product.images.map((img) => img.url)];

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddToCart = () => {
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       imageUrl: product.imageUrl,
//       color: product.color,
//       size: product.size,
//     });
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     router.push("/checkout");
//   };

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
//   const increaseQuantity = () => setQuantity(quantity + 1);

//   const goToPrevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? allImages.length - 1 : prev - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === allImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   if (isLoading) return <ProductDetailsSkeleton />;

//   // Replace the return statement with this enhanced version
//   return (
//     <>
//       <style jsx global>
//         {hideScrollbarStyle}
//       </style>
//       <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24 max-w-7xl">
//         <div className="text-xs sm:text-sm breadcrumbs mb-4 md:mb-8">
//           <ul className="flex gap-2 text-muted-foreground">
//             <li>
//               <Link href="/" className="hover:text-black transition-colors">
//                 Home
//               </Link>{" "}
//               /
//             </li>
//             <li>
//               <Link
//                 href="/products"
//                 className="hover:text-black transition-colors"
//               >
//                 Bags
//               </Link>{" "}
//               /
//             </li>
//             <li className="text-foreground font-medium">{product.name}</li>
//           </ul>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
//           {/* Image gallery */}
//           <div className="space-y-3 md:space-y-6">
//             <div className="aspect-square overflow-hidden rounded-lg md:rounded-xl border border-gray-200 relative group">
//               <Image
//                 src={allImages[currentImageIndex] || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-full object-cover product-image-zoom"
//                 width={800}
//                 height={800}
//                 priority
//               />
//               <button
//                 onClick={goToPrevImage}
//                 className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
//               </button>
//               <button
//                 onClick={goToNextImage}
//                 className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
//                 aria-label="Next image"
//               >
//                 <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
//               </button>
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
//                 {allImages.map((_, index) => (
//                   <button
//                     key={`indicator-${index}`}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`w-2 h-2 rounded-full ${
//                       currentImageIndex === index ? "bg-black" : "bg-gray-300"
//                     }`}
//                     aria-label={`Go to image ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="relative px-2 md:px-4">
//               <div className="overflow-x-auto pb-2 hide-scrollbar">
//                 <div className="flex gap-2 md:gap-3 min-w-max justify-center">
//                   {allImages.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className="focus:outline-none"
//                     >
//                       <div
//                         className={`aspect-square w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden rounded-lg border transition-all ${
//                           currentImageIndex === index
//                             ? "thumbnail-active"
//                             : "border-gray-200 hover:border-gray-400"
//                         }`}
//                       >
//                         <Image
//                           src={image || "/placeholder.svg"}
//                           alt={`${product.name} view ${index + 1}`}
//                           width={100}
//                           height={100}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="flex flex-col justify-start md:justify-center pt-2 md:pt-0">
//             <div className="space-y-5 md:space-y-8">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 tracking-tight">
//                   {product.name}
//                 </h1>
//                 <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
//                   <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
//                     {product.price.toLocaleString()} MAD
//                   </p>
//                   {product.originalPrice > product.price && (
//                     <>
//                       <p className="line-through text-muted-foreground">
//                         {product.originalPrice.toLocaleString()} MAD
//                       </p>
//                       <div className="bg-red-50 text-red-600 text-sm px-3 py-1 rounded-full font-medium">
//                         {Math.round(
//                           ((product.originalPrice - product.price) /
//                             product.originalPrice) *
//                             100
//                         )}
//                         % OFF
//                       </div>
//                     </>
//                   )}
//                 </div>
//                 <div className="h-px bg-gray-200 w-full my-4 md:my-6"></div>
//               </div>

//               <div className="grid gap-4 md:gap-6">
//                 <div>
//                   <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
//                     Color
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="w-8 h-8 rounded-full border shadow-sm ring-2 ring-offset-2 ring-black"
//                       style={{ backgroundColor: product.color }}
//                     />
//                     <span className="text-sm capitalize">{product.color}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
//                     Size
//                   </h3>
//                   <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 border border-black text-sm rounded-md font-medium">
//                     {product.size}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
//                     Quantity
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={decreaseQuantity}
//                       disabled={quantity <= 1}
//                       className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
//                     >
//                       <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
//                     </button>
//                     <span className="w-8 sm:w-10 text-center font-medium">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={increaseQuantity}
//                       className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
//                     >
//                       <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2">
//                 <button
//                   onClick={handleAddToCart}
//                   className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 bg-black text-white rounded-full hover:bg-gray-800 flex items-center justify-center elegant-button font-medium text-sm sm:text-base"
//                 >
//                   <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Ajouter
//                   au panier
//                 </button>
//                 <button
//                   onClick={handleBuyNow}
//                   className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300 font-medium elegant-button text-sm sm:text-base"
//                 >
//                   Acheter maintenant
//                 </button>
//                 {/* <button
//                   onClick={() => setIsWishlist(!isWishlist)}
//                   className="hidden sm:block p-3.5 border-2 border-gray-200 rounded-full hover:border-gray-400 transition-colors"
//                   aria-label="Add to wishlist"
//                 >
//                   <Heart
//                     className={`h-5 w-5 ${
//                       isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
//                     }`}
//                   />
//                 </button> */}
//               </div>

//               {/* <button
//                 onClick={() => setIsWishlist(!isWishlist)}
//                 className="sm:hidden mt-3 py-3 border-2 border-gray-200 rounded-full hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
//               >
//                 <Heart
//                   className={`h-4 w-4 ${
//                     isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
//                   }`}
//                 />
//                 <span className="text-sm">
//                   {isWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
//                 </span>
//               </button> */}

//               <div className="bg-gray-50 p-4 md:p-5 rounded-lg md:rounded-xl mt-2">
//                 <div className="flex items-center gap-2 md:gap-3">
//                   <Truck className="h-4 w-4 md:h-5 md:w-5 text-gray-700 flex-shrink-0" />
//                   <p className="text-xs sm:text-sm text-gray-700">
//                     Livraison Gratuite dans certaines villes.{" "}
//                     <span className="underline font-medium">
//                       Consultez les détails
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               <Tabs defaultValue="description" className="mt-4 md:mt-6">
//                 <TabsList className="grid w-full grid-cols-3 rounded-lg md:rounded-xl bg-gray-100 p-0.5 md:p-1">
//                   <TabsTrigger
//                     value="description"
//                     className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Description
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="details"
//                     className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Détails
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="shipping"
//                     className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Livraison
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent
//                   value="description"
//                   className="pt-4 md:pt-6 text-gray-600 leading-relaxed text-sm sm:text-base"
//                 >
//                   {product.description}
//                 </TabsContent>
//                 <TabsContent
//                   value="details"
//                   className="pt-4 md:pt-6 text-gray-600 text-sm sm:text-base"
//                 >
//                   <ul className="space-y-1.5 md:space-y-2">
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Nom:{" "}
//                         <span className="font-medium text-black">
//                           {product.name}
//                         </span>
//                       </span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Catégorie:{" "}
//                         <span className="font-medium text-black">
//                           {product.category?.name}
//                         </span>
//                       </span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Évaluation:{" "}
//                         <span className="font-medium text-black">
//                           {product.rating || 5} étoiles
//                         </span>
//                       </span>
//                     </li>
//                   </ul>
//                 </TabsContent>
//                 <TabsContent
//                   value="shipping"
//                   className="pt-4 md:pt-6 text-gray-600 text-sm sm:text-base"
//                 >
//                   <div className="space-y-3 md:space-y-4">
//                     <p className="font-medium text-black">
//                       Délais de livraison:
//                     </p>
//                     <ul className="space-y-1.5 md:space-y-2">
//                       <li className="flex items-center gap-2">
//                         <span className="w-2 h-2 bg-black rounded-full"></span>
//                         <span>
//                           Rabat:{" "}
//                           <span className="font-medium text-black">
//                             Mercredi & Samedi
//                           </span>
//                         </span>
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <span className="w-2 h-2 bg-black rounded-full"></span>
//                         <span>
//                           Casablanca:{" "}
//                           <span className="font-medium text-black">
//                             Samedi uniquement
//                           </span>
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   ShoppingBag,
//   Truck,
//   Minus,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { Product } from "@/lib/types";
// import { useCart } from "@/app/contexts/CartContext";
// import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

// // Replace the hideScrollbarStyle with this enhanced version
// const hideScrollbarStyle = `
//   .hide-scrollbar::-webkit-scrollbar {
//     display: none;
//   }
//   .hide-scrollbar {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }

//   .product-image-zoom {
//     transition: transform 0.3s ease;
//   }

//   .product-image-zoom:hover {
//     transform: scale(1.05);
//   }

//   .thumbnail-active {
//     border-color: #000;
//     box-shadow: 0 0 0 2px #000;
//   }

//   .elegant-button {
//     transition: all 0.3s ease;
//   }

//   .elegant-button:hover {
//     transform: translateY(-2px);
//   }
// `;

// export default function ProductDetails({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isWishlist, setIsWishlist] = useState(false);

//   const router = useRouter();
//   const { addItem } = useCart();

//   const allImages = [product.imageUrl, ...product.images.map((img) => img.url)];

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddToCart = () => {
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       imageUrl: product.imageUrl,
//       color: product.color,
//       size: product.size,
//     });
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     router.push("/checkout");
//   };

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
//   const increaseQuantity = () => setQuantity(quantity + 1);

//   const goToPrevImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? allImages.length - 1 : prev - 1
//     );
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev === allImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   if (isLoading) return <ProductDetailsSkeleton />;

//   // Replace the return statement with this enhanced version
//   return (
//     <>
//       <style jsx global>
//         {hideScrollbarStyle}
//       </style>
//       <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24 max-w-7xl">
//         <div className="block w-full overflow-x-auto mb-4 md:mb-8">
//           <div className="text-xs sm:text-sm breadcrumbs">
//             <ul className="flex flex-nowrap gap-1 sm:gap-2 text-gray-600">
//               <li className="whitespace-nowrap">
//                 <Link href="/" className="hover:text-black transition-colors">
//                   Accueil
//                 </Link>{" "}
//                 /
//               </li>
//               <li className="whitespace-nowrap">
//                 <Link
//                   href="/shop"
//                   className="hover:text-black transition-colors"
//                 >
//                   Produits
//                 </Link>{" "}
//                 /
//               </li>
//               <li className="whitespace-nowrap text-black font-medium truncate max-w-[150px] sm:max-w-none">
//                 {product.name}
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
//           {/* Image gallery */}
//           <div className="space-y-3 md:space-y-6">
//             <div className="aspect-square overflow-hidden rounded-lg md:rounded-xl border border-gray-200 relative group">
//               <Image
//                 src={allImages[currentImageIndex] || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-full object-cover product-image-zoom"
//                 width={800}
//                 height={800}
//                 priority
//               />
//               <button
//                 onClick={goToPrevImage}
//                 className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
//               </button>
//               <button
//                 onClick={goToNextImage}
//                 className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
//                 aria-label="Next image"
//               >
//                 <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
//               </button>
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
//                 {allImages.map((_, index) => (
//                   <button
//                     key={`indicator-${index}`}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`w-2 h-2 rounded-full ${
//                       currentImageIndex === index ? "bg-black" : "bg-gray-300"
//                     }`}
//                     aria-label={`Go to image ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="relative px-2 md:px-4">
//               <div className="overflow-x-auto pb-2 hide-scrollbar">
//                 <div className="flex gap-2 md:gap-3 min-w-max justify-center">
//                   {allImages.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className="focus:outline-none"
//                     >
//                       <div
//                         className={`aspect-square w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden rounded-lg border transition-all ${
//                           currentImageIndex === index
//                             ? "thumbnail-active"
//                             : "border-gray-200 hover:border-gray-400"
//                         }`}
//                       >
//                         <Image
//                           src={image || "/placeholder.svg"}
//                           alt={`${product.name} view ${index + 1}`}
//                           width={100}
//                           height={100}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="flex flex-col justify-start md:justify-center pt-2 md:pt-0">
//             <div className="space-y-5 md:space-y-8">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 tracking-tight">
//                   {product.name}
//                 </h1>
//                 <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
//                   <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
//                     {product.price.toLocaleString()} MAD
//                   </p>
//                   {product.originalPrice > product.price && (
//                     <>
//                       <p className="line-through text-muted-foreground">
//                         {product.originalPrice.toLocaleString()} MAD
//                       </p>
//                       <div className="bg-red-50 text-red-600 text-sm px-3 py-1 rounded-full font-medium">
//                         {Math.round(
//                           ((product.originalPrice - product.price) /
//                             product.originalPrice) *
//                             100
//                         )}
//                         % OFF
//                       </div>
//                     </>
//                   )}
//                 </div>
//                 <div className="h-px bg-gray-200 w-full my-4 md:my-6"></div>
//               </div>

//               <div className="grid gap-4 md:gap-6">
//                 <div>
//                   <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
//                     Color
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="w-8 h-8 rounded-full border shadow-sm ring-2 ring-offset-2 ring-black"
//                       style={{ backgroundColor: product.color }}
//                     />
//                     <span className="text-sm capitalize">{product.color}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
//                     Size
//                   </h3>
//                   <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 border border-black text-sm rounded-md font-medium">
//                     {product.size}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
//                     Quantity
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={decreaseQuantity}
//                       disabled={quantity <= 1}
//                       className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
//                     >
//                       <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
//                     </button>
//                     <span className="w-8 sm:w-10 text-center font-medium">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={increaseQuantity}
//                       className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
//                     >
//                       <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2">
//                 <button
//                   onClick={handleAddToCart}
//                   className="py-3 sm:py-3.5 px-4 sm:px-6 bg-black text-white rounded-full hover:bg-gray-800 flex items-center justify-center elegant-button font-medium text-sm sm:text-base"
//                 >
//                   <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Ajouter
//                   au panier
//                 </button>
//                 <button
//                   onClick={handleBuyNow}
//                   className="py-3 sm:py-3.5 px-4 sm:px-6 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300 font-medium elegant-button text-sm sm:text-base"
//                 >
//                   Acheter maintenant
//                 </button>
//               </div>

//               <div className="bg-gray-50 p-4 md:p-5 rounded-lg md:rounded-xl mt-2">
//                 <div className="flex items-center gap-2 md:gap-3">
//                   <Truck className="h-4 w-4 md:h-5 md:w-5 text-gray-700 flex-shrink-0" />
//                   <p className="text-xs sm:text-sm text-gray-700">
//                     Livraison Gratuite dans certaines villes.{" "}
//                     <span className="underline font-medium">
//                       Consultez les détails
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               <Tabs defaultValue="description" className="mt-4 md:mt-6">
//                 <TabsList className="grid w-full grid-cols-3 rounded-lg md:rounded-xl bg-gray-100 p-0.5 md:p-1">
//                   <TabsTrigger
//                     value="description"
//                     className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Description
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="details"
//                     className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Détails
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="shipping"
//                     className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
//                   >
//                     Livraison
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent
//                   value="description"
//                   className="pt-4 md:pt-6 text-gray-600 leading-relaxed text-sm sm:text-base"
//                 >
//                   {product.description}
//                 </TabsContent>
//                 <TabsContent
//                   value="details"
//                   className="pt-4 md:pt-6 text-gray-600 text-sm sm:text-base"
//                 >
//                   <ul className="space-y-1.5 md:space-y-2">
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Nom:{" "}
//                         <span className="font-medium text-black">
//                           {product.name}
//                         </span>
//                       </span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Catégorie:{" "}
//                         <span className="font-medium text-black">
//                           {product.category?.name}
//                         </span>
//                       </span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-black rounded-full"></span>
//                       <span>
//                         Évaluation:{" "}
//                         <span className="font-medium text-black">
//                           {product.rating || 5} étoiles
//                         </span>
//                       </span>
//                     </li>
//                   </ul>
//                 </TabsContent>
//                 <TabsContent
//                   value="shipping"
//                   className="pt-4 md:pt-6 text-gray-600 text-sm sm:text-base"
//                 >
//                   <div className="space-y-3 md:space-y-4">
//                     <p className="font-medium text-black">
//                       Délais de livraison:
//                     </p>
//                     <ul className="space-y-1.5 md:space-y-2">
//                       <li className="flex items-center gap-2">
//                         <span className="w-2 h-2 bg-black rounded-full"></span>
//                         <span>
//                           Rabat:{" "}
//                           <span className="font-medium text-black">
//                             Mercredi & Samedi
//                           </span>
//                         </span>
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <span className="w-2 h-2 bg-black rounded-full"></span>
//                         <span>
//                           Casablanca:{" "}
//                           <span className="font-medium text-black">
//                             Samedi uniquement
//                           </span>
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/lib/types";
import { useCart } from "@/app/contexts/CartContext";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

// Replace the hideScrollbarStyle with this enhanced version
const hideScrollbarStyle = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .product-image-zoom {
    transition: transform 0.3s ease;
  }
  
  .product-image-zoom:hover {
    transform: scale(1.05);
  }
  
  .thumbnail-active {
    border-color: #000;
    box-shadow: 0 0 0 2px #000;
  }
  
  .elegant-button {
    transition: all 0.3s ease;
  }
  
  .elegant-button:hover {
    transform: translateY(-2px);
  }
`;

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlist, setIsWishlist] = useState(false);

  const router = useRouter();
  const { addItem } = useCart();

  const allImages = [product.imageUrl, ...product.images.map((img) => img.url)];

  // Check if product is out of stock
  const isOutOfStock = product.stock <= 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Ensure quantity doesn't exceed available stock
  useEffect(() => {
    if (product.stock > 0 && quantity > product.stock) {
      setQuantity(product.stock);
    }
  }, [product.stock, quantity]);

  const handleAddToCart = () => {
    // Prevent adding to cart if out of stock
    if (isOutOfStock) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
      color: product.color,
      size: product.size,
    });
  };

  const handleBuyNow = () => {
    // Prevent buying if out of stock
    if (isOutOfStock) return;

    handleAddToCart();
    router.push("/checkout");
  };

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const increaseQuantity = () => {
    // Don't allow increasing beyond available stock
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <>
      <style jsx global>
        {hideScrollbarStyle}
      </style>
      <div className="container mx-auto px-4 py-24 md:py-16 lg:py-24 max-w-7xl">
        <div className="block w-full overflow-x-auto mb-4 md:mb-8">
          <div className="text-xs sm:text-sm breadcrumbs">
            <ul className="flex flex-nowrap gap-1 sm:gap-2 text-gray-600">
              <li className="whitespace-nowrap">
                <Link href="/" className="hover:text-black transition-colors">
                  Accueil
                </Link>{" "}
                /
              </li>
              <li className="whitespace-nowrap">
                <Link
                  href="/shop"
                  className="hover:text-black transition-colors"
                >
                  Produits
                </Link>{" "}
                /
              </li>
              <li className="whitespace-nowrap text-black font-medium truncate max-w-[150px] sm:max-w-none">
                {product.name}
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-3 md:space-y-6">
            <div className="aspect-square overflow-hidden rounded-lg md:rounded-xl border border-gray-200 relative group">
              <Image
                src={allImages[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover product-image-zoom"
                width={800}
                height={800}
                priority
              />
              <button
                onClick={goToPrevImage}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allImages.map((_, index) => (
                  <button
                    key={`indicator-${index}`}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? "bg-black" : "bg-gray-300"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Out of stock overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white px-6 py-3 rounded-md text-red-600 font-bold flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    RUPTURE DE STOCK
                  </div>
                </div>
              )}
            </div>
            <div className="relative px-2 md:px-4">
              <div className="overflow-x-auto pb-2 hide-scrollbar">
                <div className="flex gap-2 md:gap-3 min-w-max justify-center">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="focus:outline-none"
                    >
                      <div
                        className={`aspect-square w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden rounded-lg border transition-all ${
                          currentImageIndex === index
                            ? "thumbnail-active"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} view ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start md:justify-center pt-2 md:pt-0">
            <div className="space-y-5 md:space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 tracking-tight">
                  {product.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    {product.price.toLocaleString()} MAD
                  </p>
                  {product.originalPrice > product.price && (
                    <>
                      <p className="line-through text-muted-foreground">
                        {product.originalPrice.toLocaleString()} MAD
                      </p>
                      <div className="bg-red-50 text-red-600 text-sm px-3 py-1 rounded-full font-medium">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    </>
                  )}
                </div>

                {/* Stock information */}
                <div className="flex items-center mt-2">
                  {isOutOfStock ? (
                    <span className="text-red-600 font-medium flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      Rupture de stock
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      En stock ({product.stock} disponible
                      {product.stock > 1 ? "s" : ""})
                    </span>
                  )}
                </div>

                <div className="h-px bg-gray-200 w-full my-4 md:my-6"></div>
              </div>

              <div className="grid gap-4 md:gap-6">
                <div>
                  <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
                    Color
                  </h3>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full border shadow-sm ring-2 ring-offset-2 ring-black"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="text-sm capitalize">{product.color}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
                    Size
                  </h3>
                  <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 border border-black text-sm rounded-md font-medium">
                    {product.size}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                    <span className="w-8 sm:w-10 text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`py-3 sm:py-3.5 px-4 sm:px-6 rounded-full flex items-center justify-center elegant-button font-medium text-sm sm:text-base ${
                    isOutOfStock
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Ajouter
                  au panier
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`py-3 sm:py-3.5 px-4 sm:px-6 border-2 rounded-full transition-colors duration-300 font-medium elegant-button text-sm sm:text-base ${
                    isOutOfStock
                      ? "border-gray-300 text-gray-500 cursor-not-allowed"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Acheter maintenant
                </button>
              </div>

              <div className="bg-gray-50 p-4 md:p-5 rounded-lg md:rounded-xl mt-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <Truck className="h-4 w-4 md:h-5 md:w-5 text-gray-700 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700">
                    Livraison Gratuite dans certaines villes.{" "}
                    <span className="underline font-medium">
                      Consultez les détails
                    </span>
                  </p>
                </div>
              </div>

              <Tabs defaultValue="description" className="mt-4 md:mt-6">
                <TabsList className="grid w-full grid-cols-3 rounded-lg md:rounded-xl bg-gray-100 p-0.5 md:p-1">
                  <TabsTrigger
                    value="description"
                    className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Détails
                  </TabsTrigger>
                  <TabsTrigger
                    value="shipping"
                    className="text-xs sm:text-sm py-1.5 md:py-2 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Livraison
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="description"
                  className="pt-4 md:pt-6 text-gray-600 leading-relaxed text-sm sm:text-base"
                >
                  {product.description}
                </TabsContent>
                <TabsContent
                  value="details"
                  className="pt-4 md:pt-6 text-gray-600 text-sm sm:text-base"
                >
                  <ul className="space-y-1.5 md:space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full"></span>
                      <span>
                        Nom:{" "}
                        <span className="font-medium text-black">
                          {product.name}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full"></span>
                      <span>
                        Catégorie:{" "}
                        <span className="font-medium text-black">
                          {product.category?.name}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full"></span>
                      <span>
                        Évaluation:{" "}
                        <span className="font-medium text-black">
                          {product.rating || 5} étoiles
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full"></span>
                      <span>
                        Stock:{" "}
                        <span
                          className={`font-medium ${
                            isOutOfStock ? "text-red-600" : "text-black"
                          }`}
                        >
                          {isOutOfStock
                            ? "Rupture de stock"
                            : `${product.stock} disponible${
                                product.stock > 1 ? "s" : ""
                              }`}
                        </span>
                      </span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent
                  value="shipping"
                  className="pt-4 md:pt-6 text-gray-600 text-sm sm:text-base"
                >
                  <div className="space-y-3 md:space-y-4">
                    <p className="font-medium text-black">
                      Délais de livraison:
                    </p>
                    <ul className="space-y-1.5 md:space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-black rounded-full"></span>
                        <span>
                          Rabat:{" "}
                          <span className="font-medium text-black">
                            Mercredi & Samedi
                          </span>
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-black rounded-full"></span>
                        <span>
                          Casablanca:{" "}
                          <span className="font-medium text-black">
                            Samedi uniquement
                          </span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
