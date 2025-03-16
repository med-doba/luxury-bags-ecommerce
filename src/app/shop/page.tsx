// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Filter } from "lucide-react";
// import type { Product } from "@/lib/types";
// import FilterDrawer from "@/app/components/FilterDrawer";
// import CategorySection from "@/app/components/CategorySection";
// import { useCloseOnNavigation } from "@/hooks/useCloseOnNavigation";

// export default function ShopPage() {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   // useCloseOnNavigation(() => {
//   //   setIsFilterOpen(false);
//   // });

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await fetch("/api/products");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await response.json();
//         setProducts(data);
//         setFilteredProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }

//     fetchProducts();
//   }, []);

//   const handleApplyFilters = (filters: Record<string, string[]>) => {
//     let filtered = [...products];

//     Object.entries(filters).forEach(([category, selectedOptions]) => {
//       if (selectedOptions.length > 0) {
//         filtered = filtered.filter((product) => {
//           switch (category) {
//             case "colours":
//               return selectedOptions.includes(product.color.toUpperCase());
//             case "sizes":
//               return selectedOptions.includes(product.size.toUpperCase());
//             case "categories":
//               return selectedOptions.includes(
//                 product.category?.name?.toUpperCase() || ""
//               );
//             case "price":
//               const [min, max] = selectedOptions.map(Number);
//               return product.price >= min && product.price <= max;
//             default:
//               return true;
//           }
//         });
//       }
//     });

//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="bg-background min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-primary">
//             Acheter tous les sacs
//           </h1>
//           {/* <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center space-x-2 text-text hover:text-primary transition-colors"
//           >
//             <Filter className="h-5 w-5" />
//             <span className="text-sm font-medium">Filters</span>
//           </button> */}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.map((product) => (
//             <Link
//               href={`/shop/${product.id}`}
//               key={product.id}
//               className="group"
//             >
//               <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
//                 <Image
//                   src={product.imageUrl || "/placeholder.svg"}
//                   alt={product.name}
//                   fill
//                   className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
//                   sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
//                 />
//               </div>
//               <div className="mt-4 space-y-1">
//                 <h3 className="text-sm text-gray-700">{product.name}</h3>
//                 <p className="text-lg font-medium text-gray-900">
//                   {/* {parseFloat(product.price).toFixed(2)} MAD */}
//                   {Number(product.price)?.toFixed(2) ?? "0.00"} MAD
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* <CategorySection /> */}

//         <FilterDrawer
//           isOpen={isFilterOpen}
//           onClose={() => setIsFilterOpen(false)}
//           onApply={handleApplyFilters}
//         />
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { Filter } from "lucide-react";
// import type { Product, Category } from "@/lib/types";
// // import FilterDrawer from "@/app/components/FilterDrawer";
// import { useCloseOnNavigation } from "@/hooks/useCloseOnNavigation";

// export default function ShopPage() {
//   const searchParams = useSearchParams();
//   const categoryId = searchParams.get("category");

//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   // Close filter drawer on navigation
//   useCloseOnNavigation(() => {
//     setIsFilterOpen(false);
//   });

//   // Fetch categories
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch("/api/admin/categories/get-all");
//         if (!response.ok) {
//           throw new Error("Failed to fetch categories");
//         }
//         const data = await response.json();
//         setCategories(data);

//         // If we have a categoryId, find the matching category
//         if (categoryId) {
//           const category = data.find((cat: Category) => cat.id === categoryId);
//           setSelectedCategory(category || null);
//         } else {
//           setSelectedCategory(null);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     }

//     fetchCategories();
//   }, [categoryId]);

//   // Fetch products
//   useEffect(() => {
//     async function fetchProducts() {
//       setIsLoading(true);
//       try {
//         const response = await fetch("/api/products");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await response.json();
//         setProducts(data);

//         // Filter products by category if a category is selected
//         if (categoryId) {
//           const filtered = data.filter(
//             (product: Product) => product.categoryId === categoryId
//           );
//           setFilteredProducts(filtered);
//         } else {
//           setFilteredProducts(data);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchProducts();
//   }, [categoryId]);

//   const handleApplyFilters = (filters: Record<string, string[]>) => {
//     let filtered = [...products];

//     // If a category is selected from the URL, apply that filter first
//     if (categoryId) {
//       filtered = filtered.filter(
//         (product) => product.categoryId === categoryId
//       );
//     }

//     // Then apply the other filters
//     Object.entries(filters).forEach(([category, selectedOptions]) => {
//       if (selectedOptions.length > 0) {
//         filtered = filtered.filter((product) => {
//           switch (category) {
//             case "colours":
//               return selectedOptions.includes(product.color.toUpperCase());
//             case "sizes":
//               return selectedOptions.includes(product.size.toUpperCase());
//             case "categories":
//               // Skip this filter if we're already filtering by category from the URL
//               return categoryId
//                 ? true
//                 : selectedOptions.includes(
//                     product.category?.name?.toUpperCase() || ""
//                   );
//             case "price":
//               const [min, max] = selectedOptions.map(Number);
//               return product.price >= min && product.price <= max;
//             default:
//               return true;
//           }
//         });
//       }
//     });

//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="bg-background min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-primary">
//             {selectedCategory
//               ? `${selectedCategory.name}`
//               : "Acheter tous les sacs"}
//           </h1>
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center space-x-2 text-text hover:text-primary transition-colors"
//           >
//             <Filter className="h-5 w-5" />
//             <span className="text-sm font-medium">Filters</span>
//           </button>
//         </div>

//         {isLoading ? (
//           // Loading state
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, index) => (
//               <div key={index} className="animate-pulse">
//                 <div className="bg-gray-200 rounded-lg aspect-square w-full"></div>
//                 <div className="mt-4 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                   <div className="h-6 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filteredProducts.length > 0 ? (
//           // Products grid
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <Link
//                 href={`/shop/${product.id}`}
//                 key={product.id}
//                 className="group"
//               >
//                 <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
//                   <Image
//                     src={product.imageUrl || "/placeholder.svg"}
//                     alt={product.name}
//                     fill
//                     className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
//                     sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
//                   />
//                 </div>
//                 <div className="mt-4 space-y-1">
//                   <h3 className="text-sm text-gray-700">{product.name}</h3>
//                   <p className="text-lg font-medium text-gray-900">
//                     {Number(product.price)?.toFixed(2) ?? "0.00"} MAD
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           // No products found
//           <div className="text-center py-16">
//             <p className="text-xl text-gray-600">
//               Aucun produit trouvé dans cette catégorie.
//             </p>
//             <Link
//               href="/shop"
//               className="mt-4 inline-block px-6 py-2 border border-gray-300 rounded-md text-primary hover:bg-gray-50 transition-colors"
//             >
//               Voir tous les produits
//             </Link>
//           </div>
//         )}

//         {/* <FilterDrawer
//           isOpen={isFilterOpen}
//           onClose={() => setIsFilterOpen(false)}
//           onApply={handleApplyFilters}
//           selectedCategoryId={categoryId || undefined}
//         /> */}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Filter } from "lucide-react";
import type { Product, Category } from "@/lib/types";
// import FilterDrawer from "@/app/components/FilterDrawer";
import { useCloseOnNavigation } from "@/hooks/useCloseOnNavigation";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams?.get("category") || null;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // Close filter drawer on navigation
  useCloseOnNavigation(() => {
    setIsFilterOpen(false);
  });

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/admin/categories/get-all");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);

        // If we have a categoryId, find the matching category
        if (categoryId) {
          const category = data.find((cat: Category) => cat.id === categoryId);
          setSelectedCategory(category || null);
        } else {
          setSelectedCategory(null);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, [categoryId]);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        // Use different endpoints based on whether a category is selected
        const url = categoryId
          ? `/api/products/by-category/${categoryId}`
          : "/api/products";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(
          `Fetched ${data.length} products${
            categoryId ? ` for category ${categoryId}` : ""
          }`
        );

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);

  const handleApplyFilters = (filters: Record<string, string[]>) => {
    let filtered = [...products];

    // Apply filters
    Object.entries(filters).forEach(([category, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        filtered = filtered.filter((product) => {
          switch (category) {
            case "colours":
              return selectedOptions.includes(product.color.toUpperCase());
            case "sizes":
              return selectedOptions.includes(product.size.toUpperCase());
            case "categories":
              // Skip this filter if we're already filtering by category from the URL
              return categoryId
                ? true
                : selectedOptions.includes(
                    product.category?.name?.toUpperCase() || ""
                  );
            case "price":
              const [min, max] = selectedOptions.map(Number);
              return product.price >= min && product.price <= max;
            default:
              return true;
          }
        });
      }
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            {selectedCategory
              ? `${selectedCategory.name}`
              : "Acheter tous les sacs"}
          </h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 text-text hover:text-primary transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>

        {isLoading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-square w-full"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          // Products grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                href={`/shop/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="text-lg font-medium text-gray-900">
                    {Number(product.price)?.toFixed(2) ?? "0.00"} MAD
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // No products found
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              Aucun produit trouvé dans cette catégorie.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-6 py-2 border border-gray-300 rounded-md text-primary hover:bg-gray-50 transition-colors"
            >
              Voir tous les produits
            </Link>
          </div>
        )}

        {/* <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
          selectedCategoryId={categoryId || undefined}
        /> */}
      </div>
    </div>
  );
}
