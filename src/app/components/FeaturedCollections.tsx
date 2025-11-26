"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { getDisplayPrice, getSaleInfo } from "@/lib/priceUtils";
import ProductImageCarousel from "./ProductImageCarousel";

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

  // Helper function to get all images from a product
  const getProductImages = (product: Product) => {
    const images: { url: string; alt?: string }[] = [];
    
    // Add color variant images
    if (product.colorVariants) {
      product.colorVariants.forEach((colorVariant) => {
        if (colorVariant.images) {
          colorVariant.images.forEach((img) => {
            images.push({
              url: img.url,
              alt: `${product.name} - ${colorVariant.color}`,
            });
          });
        }
      });
    }
    
    // Add regular product images (legacy)
    if (product.images) {
      product.images.forEach((img) => {
        images.push({
          url: img.url,
          alt: product.name,
        });
      });
    }
    
    return images;
  };

  return (
    <section className="bg-background" id="FeaturedCollections">
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
          {products.slice(0, displayCount).map((product) => {
            const saleInfo = getSaleInfo(product);
            const additionalImages = getProductImages(product);
            
            return (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group"
              >
                <ProductImageCarousel
                  mainImage={product.imageUrl || "/placeholder.svg"}
                  additionalImages={additionalImages}
                  productName={product.name}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  saleInfo={saleInfo.isOnSale ? {
                    isOnSale: true,
                    percentage: saleInfo.percentage
                  } : { isOnSale: false }}
                  cycleInterval={1400} // 1.4 seconds between images
                />
                <div className="mt-4 space-y-1">
                  <h3 className="text-sm text-text">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    {saleInfo.isOnSale ? (
                      <>
                        <p className="text-lg font-medium text-primary">
                          {saleInfo.salePrice.toFixed(2)} MAD
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          {saleInfo.originalPrice?.toFixed(2)} MAD
                        </p>
                        <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded">
                          -{saleInfo.percentage}%
                        </span>
                      </>
                    ) : (
                      <p className="text-lg font-medium text-primary">
                        {getDisplayPrice(product).toFixed(2)} MAD
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
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
