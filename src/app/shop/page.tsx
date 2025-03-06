// "use client";

// import { useState, useEffect } from "react";
// import { Filter } from "lucide-react";
// import type { Product } from "@/lib/types";
// import ProductGrid from "../components/ProductGrid";
// import FilterDrawer from "../components/FilterDrawer";
// import CategorySection from "../components/CategorySection";

// export default function ShopPage() {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await fetch("/api/products");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await response.json();
//         console.log("images url : ", data);
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
//               return selectedOptions.includes(product.category.toUpperCase());
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
//           <h1 className="text-4xl font-bold text-primary">Shop All Bags</h1>
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center space-x-2 text-text hover:text-primary transition-colors"
//           >
//             <Filter className="h-5 w-5" />
//             <span className="text-sm font-medium">Filters</span>
//           </button>
//         </div>

//         <ProductGrid products={filteredProducts} />

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
// import Link from "next/link";
// import { Filter } from "lucide-react";
// import type { Product } from "@/lib/types";
// import FilterDrawer from "../components/FilterDrawer";
// import CategorySection from "../components/CategorySection";

// export default function ShopPage() {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
//                 product.category.name.toUpperCase()
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
//           <h1 className="text-4xl font-bold text-primary">Shop All Bags</h1>
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center space-x-2 text-text hover:text-primary transition-colors"
//           >
//             <Filter className="h-5 w-5" />
//             <span className="text-sm font-medium">Filters</span>
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.map((product) => (
//             <Link
//               href={`/shop/${product.id}`}
//               key={product.id}
//               className="group"
//             >
//               <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
//                 <img
//                   src={product.imageUrl || "/placeholder.svg"}
//                   alt={product.name}
//                   className="h-full w-full object-cover object-center group-hover:opacity-75"
//                 />
//               </div>
//               <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
//               <p className="mt-1 text-lg font-medium text-gray-900">
//                 ${parseFloat(product.price).toFixed(2)}
//               </p>
//             </Link>
//           ))}
//         </div>

//         <CategorySection />

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
// import Link from "next/link";
// import Image from "next/image";
// import { Filter } from "lucide-react";
// import type { Product } from "@/lib/types";
// import FilterDrawer from "../components/FilterDrawer";
// import CategorySection from "../components/CategorySection";
// import { useCloseOnNavigation } from "@/hooks/useCloseOnNavigation";

// export default function ShopPage() {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
//                 product.category.name.toUpperCase()
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

//   // useCloseOnNavigation(() => {
//   //   setIsFilterOpen(false);
//   // });

//   return (
//     <div className="bg-background min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-primary">Shop All Bags</h1>
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center space-x-2 text-text hover:text-primary transition-colors"
//           >
//             <Filter className="h-5 w-5" />
//             <span className="text-sm font-medium">Filters</span>
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.length > 0 &&
//             filteredProducts.map((product) => (
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
//                     ${parseFloat(product.price).toFixed(2)}
//                   </p>
//                 </div>
//               </Link>
//             ))}
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Filter } from "lucide-react";
import type { Product } from "@/lib/types";
import FilterDrawer from "@/app/components/FilterDrawer";
import CategorySection from "@/app/components/CategorySection";
import { useCloseOnNavigation } from "@/hooks/useCloseOnNavigation";

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // useCloseOnNavigation(() => {
  //   setIsFilterOpen(false);
  // });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleApplyFilters = (filters: Record<string, string[]>) => {
    let filtered = [...products];

    Object.entries(filters).forEach(([category, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        filtered = filtered.filter((product) => {
          switch (category) {
            case "colours":
              return selectedOptions.includes(product.color.toUpperCase());
            case "sizes":
              return selectedOptions.includes(product.size.toUpperCase());
            case "categories":
              return selectedOptions.includes(
                product.category.name.toUpperCase()
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Acheter tous les sacs
          </h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 text-text hover:text-primary transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>

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
                  {parseFloat(product.price).toFixed(2)} MAD
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* <CategorySection /> */}

        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
        />
      </div>
    </div>
  );
}
