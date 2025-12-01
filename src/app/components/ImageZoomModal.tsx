"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ColorVariantImage {
  id: string;
  url: string;
}

interface ColorVariant {
  id: string;
  color: string;
  colorHex?: string;
  stock: number;
  images: ColorVariantImage[];
}

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
  productName: string;
  filterByColor?: string; // If provided, only show images from this color variant
  colorVariants?: ColorVariant[];
}

export default function ImageZoomModal({
  isOpen,
  onClose,
  images,
  initialIndex,
  productName,
  filterByColor,
  colorVariants,
}: ImageZoomModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Filter images by color if specified
  const getFilteredImages = () => {
    if (!filterByColor || !colorVariants) {
      return images;
    }

    // Find the color variant and return only its images
    const colorVariant = colorVariants.find((cv) => cv.color === filterByColor);
    if (colorVariant && colorVariant.images && colorVariant.images.length > 0) {
      return colorVariant.images.map((img) => img.url);
    }

    return images;
  };

  const filteredImages = getFilteredImages();

  // Reset index when modal opens or color filter changes
  useEffect(() => {
    if (isOpen) {
      const validIndex = Math.min(initialIndex, filteredImages.length - 1);
      setCurrentIndex(Math.max(0, validIndex));
    }
  }, [isOpen, initialIndex, filteredImages.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, filteredImages.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const getColorDisplayName = (colorName: string) => {
    return colorName.charAt(0).toUpperCase() + colorName.slice(1);
  };

  if (!isOpen || filteredImages.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-90 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Close Button - positioned absolutely in top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white hover:text-gray-300 transition-colors p-2 bg-black bg-opacity-50 rounded-full backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Main Image Area */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={filteredImages[currentIndex] || "/placeholder.svg"}
              alt={`${productName} - ${
                filterByColor ? `${getColorDisplayName(filterByColor)} - ` : ""
              }Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>

          {/* Navigation Arrows */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentIndex + 1} / {filteredImages.length}
        </div>
      </div>
    </div>
  );
}
