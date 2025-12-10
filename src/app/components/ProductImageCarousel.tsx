"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ProductImage {
  url: string;
  alt?: string;
}

interface ProductImageCarouselProps {
  mainImage: string;
  additionalImages: ProductImage[];
  productName: string;
  className?: string;
  sizes?: string;
  saleInfo?: {
    isOnSale: boolean;
    percentage?: number;
  };
  stockStatus?: {
    inStock: boolean;
    message?: string;
  };
  cycleInterval?: number; // milliseconds between image changes
}

export default function ProductImageCarousel({
  mainImage,
  additionalImages = [],
  productName,
  className = "",
  sizes = "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  saleInfo,
  stockStatus,
  cycleInterval = 1000, // 1 second by default
}: ProductImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create array of all images (main + additional)
  const allImages = [
    { url: mainImage, alt: productName },
    ...additionalImages.map((img, index) => ({
      url: img.url,
      alt: img.alt || `${productName} image ${index + 2}`,
    })),
  ];

  // Only enable carousel if there are multiple images
  const hasMultipleImages = allImages.length > 1;

  useEffect(() => {
    if (isHovered && hasMultipleImages) {
      // Start the smooth image cycling
      // setCurrentImageIndex(1);
      // if (intervalRef.current) {
      //   clearInterval(intervalRef.current);
      //   intervalRef.current = null;
      // }
      // intervalRef.current = setInterval(() => {
      //   setCurrentImageIndex((prevIndex) =>
      //     prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      //   );
      // }, cycleInterval);

      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === allImages.length - 1 ? 0 : 1
        );
      }, cycleInterval);
    } else {
      // Stop cycling and reset to first image
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (!isHovered) {
        setCurrentImageIndex(0);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, hasMultipleImages, allImages.length, cycleInterval]);

  const currentImage = allImages[currentImageIndex] || allImages[0];

  return (
    <div
      className={`relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200 ${className} transition-all duration-500 ease-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image with smooth crossfade */}
      <Image
        key={`${currentImage?.url}-${currentImageIndex}`}
        src={currentImage?.url || "/placeholder.svg"}
        alt={currentImage?.alt || productName}
        fill
        className={`object-cover object-center transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isHovered
            ? "scale-[1.015] brightness-105"
            : "scale-100 brightness-100"
        } animate-fadeInSmooth`}
        sizes={sizes}
        priority={currentImageIndex === 0}
      />

      {/* Sale Badge */}
      {saleInfo?.isOnSale && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded z-10">
          SALE -{saleInfo.percentage}%
        </div>
      )}

      {/* Stock Status Overlay */}
      {stockStatus && !stockStatus.inStock && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white px-3 py-1 rounded-md text-red-600 font-bold text-sm flex items-center">
            <svg
              className="mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {stockStatus.message || "RUPTURE DE STOCK"}
          </div>
        </div>
      )}

      {/* Image Indicator Dots (only show if multiple images) */}
      {/* {hasMultipleImages && (
        <div
          className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isHovered
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-3 scale-95"
          }`}
        >
          {allImages.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                currentImageIndex === index
                  ? "w-2.5 h-2.5 bg-white shadow-2xl scale-110 ring-1 ring-white/30"
                  : "w-2 h-2 bg-white/70 scale-100 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      )} */}

      {/* Enhanced overlay effect on hover */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isHovered
            ? "bg-gradient-to-t from-black/10 via-transparent to-transparent backdrop-blur-[0.5px]"
            : "bg-transparent"
        }`}
      />
    </div>
  );
}
