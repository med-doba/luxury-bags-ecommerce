"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

export default function FeaturedCollections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayCount, setDisplayCount] = useState(8);
  const totalProducts = products.length;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products?featured=true");
        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    }

    fetchProducts();
  }, []);

  const loadMore = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 4, totalProducts));
  };

  return (
    <section className="bg-background">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl font-extrabold text-primary">
            Nouvelle Collection
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-primary hover:text-secondary transition-colors duration-300"
          >
            Voir tout
          </Link>
        </div>
        <div className="border-b border-accent mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {products.slice(0, displayCount).map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-sm text-text">{product.name}</h3>
                <p className="text-lg font-medium text-primary">
                  {/* {parseFloat(product.price).toFixed(2)} MAD */}
                  {Number(product.price)?.toFixed(2) ?? "0.00"} MAD
                </p>
              </div>
            </Link>
          ))}
        </div>
        {displayCount < totalProducts && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="inline-block bg-primary text-white py-2 px-6 border border-transparent rounded-md text-sm font-medium hover:bg-secondary transition-colors duration-300"
            >
              Charger plus
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
