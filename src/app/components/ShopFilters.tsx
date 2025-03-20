// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Slider } from "@/components/ui/slider";
// import { getCategories } from "@/lib/getCategories";

// interface ShopFiltersProps {
//   selectedCategory?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   sort?: string;
//   search?: string;
// }

// export default function ShopFilters({
//   selectedCategory,
//   minPrice,
//   maxPrice,
//   sort,
//   search,
// }: ShopFiltersProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [categories, setCategories] = useState<any[]>([]);
//   const [priceRange, setPriceRange] = useState<[number, number]>([
//     Number.parseInt(minPrice || "0"),
//     Number.parseInt(maxPrice || "1000"),
//   ]);
//   const [sortOption, setSortOption] = useState(sort || "newest");
//   const [searchTerm, setSearchTerm] = useState(search || "");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadCategories() {
//       try {
//         const data = await getCategories();
//         setCategories(data);
//       } catch (error) {
//         console.error("Error loading categories:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadCategories();
//   }, []);

//   const applyFilters = () => {
//     const params = new URLSearchParams();

//     if (selectedCategory) params.set("category", selectedCategory);
//     if (priceRange[0] > 0) params.set("min", priceRange[0].toString());
//     if (priceRange[1] < 1000) params.set("max", priceRange[1].toString());
//     if (sortOption !== "newest") params.set("sort", sortOption);
//     if (searchTerm) params.set("search", searchTerm);

//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const clearFilters = () => {
//     router.push(pathname);
//     setPriceRange([0, 1000]);
//     setSortOption("newest");
//     setSearchTerm("");
//   };

//   const handleCategoryChange = (categoryId: string) => {
//     const params = new URLSearchParams();
//     params.set("category", categoryId);

//     if (priceRange[0] > 0) params.set("min", priceRange[0].toString());
//     if (priceRange[1] < 1000) params.set("max", priceRange[1].toString());
//     if (sortOption !== "newest") params.set("sort", sortOption);
//     if (searchTerm) params.set("search", searchTerm);

//     router.push(`${pathname}?${params.toString()}`);
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
//         {isLoading ? (
//           <div className="animate-pulse space-y-2">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="h-6 bg-gray-200 rounded w-3/4"></div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-2">
//             <button
//               onClick={() => router.push(pathname)}
//               className={`block text-left w-full px-2 py-1 rounded ${
//                 !selectedCategory
//                   ? "bg-gray-100 font-medium"
//                   : "hover:bg-gray-50"
//               }`}
//             >
//               All Products
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleCategoryChange(category.id)}
//                 className={`block text-left w-full px-2 py-1 rounded ${
//                   selectedCategory === category.id
//                     ? "bg-gray-100 font-medium"
//                     : "hover:bg-gray-50"
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div>
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
//         <Slider
//           defaultValue={priceRange}
//           min={0}
//           max={1000}
//           step={10}
//           onValueChange={(value) => setPriceRange(value as [number, number])}
//           className="mb-6"
//         />
//         <div className="flex justify-between text-sm text-gray-500">
//           <span>{priceRange[0]} MAD</span>
//           <span>{priceRange[1]} MAD</span>
//         </div>
//       </div>

//       <div>
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Sort By</h3>
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
//         >
//           <option value="newest">Newest</option>
//           <option value="price-asc">Price: Low to High</option>
//           <option value="price-desc">Price: High to Low</option>
//         </select>
//       </div>

//       <div>
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Search</h3>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search products..."
//           className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
//         />
//       </div>

//       <div className="pt-4 space-y-3">
//         <button
//           onClick={applyFilters}
//           className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors"
//         >
//           Apply Filters
//         </button>
//         <button
//           onClick={clearFilters}
//           className="w-full bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//         >
//           Clear Filters
//         </button>
//       </div>
//     </div>
//   );
// }
