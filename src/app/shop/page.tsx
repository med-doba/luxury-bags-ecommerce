"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import ProductGrid from "../components/ProductGrid";
// import { Slider } from "@/components/ui/slider";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import FilterDrawer from "../components/FilterDrawer";

// Mock data for products
const products: Product[] = [
  {
    id: 1,
    name: "The Classic Tote",
    price: 299,
    imageSrc: "/classic-tote.jpg",
    description: "A timeless tote bag perfect for everyday use.",
    category: "tote",
    colors: ["Black", "Brown", "Navy"],
    sizes: ["Medium", "Large"],
  },
  {
    id: 2,
    name: "Elegant Crossbody",
    price: 199,
    imageSrc: "/classic-tote.jpg",
    description: "A sleek crossbody bag for a night out.",
    category: "crossbody",
    colors: ["Red", "Black", "White"],
    sizes: ["Small", "Medium"],
  },
  {
    id: 3,
    name: "Luxe Leather Satchel",
    price: 349,
    imageSrc: "/classic-tote.jp.jpg",
    description: "A premium leather satchel for the discerning professional.",
    category: "satchel",
    colors: ["Brown", "Black"],
    sizes: ["Medium", "Large"],
  },
  {
    id: 4,
    name: "Mini Evening Clutch",
    price: 149,
    imageSrc: "/classic-tote.jpg",
    description: "A compact clutch for your essential items.",
    category: "clutch",
    colors: ["Gold", "Silver", "Black"],
    sizes: ["One Size"],
  },
  {
    id: 5,
    name: "Weekender Duffel",
    price: 279,
    imageSrc: "/classic-tote.jpg",
    description: "A spacious duffel bag for short trips.",
    category: "duffel",
    colors: ["Navy", "Olive", "Gray"],
    sizes: ["Large"],
  },
  {
    id: 11,
    name: "The Classic Tote",
    price: 299,
    imageSrc: "/classic-tote.jpg",
    description: "A timeless tote bag perfect for everyday use.",
    category: "tote",
    colors: ["Black", "Brown", "Navy"],
    sizes: ["Medium", "Large"],
  },
  {
    id: 12,
    name: "Elegant Crossbody",
    price: 199,
    imageSrc: "/classic-tote.jpg",
    description: "A sleek crossbody bag for a night out.",
    category: "crossbody",
    colors: ["Red", "Black", "White"],
    sizes: ["Small", "Medium"],
  },
  {
    id: 13,
    name: "Luxe Leather Satchel",
    price: 349,
    imageSrc: "/classic-tote.jp.jpg",
    description: "A premium leather satchel for the discerning professional.",
    category: "satchel",
    colors: ["Brown", "Black"],
    sizes: ["Medium", "Large"],
  },
  {
    id: 14,
    name: "Mini Evening Clutch",
    price: 149,
    imageSrc: "/classic-tote.jpg",
    description: "A compact clutch for your essential items.",
    category: "clutch",
    colors: ["Gold", "Silver", "Black"],
    sizes: ["One Size"],
  },
  {
    id: 15,
    name: "Weekender Duffel",
    price: 279,
    imageSrc: "/classic-tote.jpg",
    description: "A spacious duffel bag for short trips.",
    category: "duffel",
    colors: ["Navy", "Olive", "Gray"],
    sizes: ["Large"],
  },
];

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleApplyFilters = (filters: Record<string, string[]>) => {
    // Filter products based on the selected filters
    let filtered = [...products];

    Object.entries(filters).forEach(([category, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        filtered = filtered.filter((product) => {
          switch (category) {
            case "colours":
              return selectedOptions.includes(product.color.toUpperCase());
            case "sizes":
              return selectedOptions.includes(product.size.toUpperCase());
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
          <h1 className="text-4xl font-bold text-primary">Shop All Bags</h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 text-text hover:text-primary transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>

        <ProductGrid products={filteredProducts} />

        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
        />
      </div>
    </div>
  );
}
