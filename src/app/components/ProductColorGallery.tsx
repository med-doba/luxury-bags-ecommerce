"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ColorVariantImage {
  id: string;
  url: string;
}

interface ColorVariant {
  id: string;
  colorHex: string;
  stock: number;
  images: ColorVariantImage[];
}

interface ProductColorGalleryProps {
  colorVariants: ColorVariant[];
  productName: string;
  onColorChange?: (selectedVariant: ColorVariant) => void;
  onStockCheck?: (stock: number) => void;
}

export default function ProductColorGallery({
  colorVariants,
  productName,
  onColorChange,
  onStockCheck,
}: ProductColorGalleryProps) {
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant>(
    colorVariants[0] || null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Utility function to get contrast text color
  const getContrastColor = (hexColor: string): string => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  // Generate color name from hex (simple approximation)
  const getColorName = (hex: string): string => {
    // This is a simple color name generator - in production you might want
    // a more sophisticated color naming system
    const colorNames: { [key: string]: string } = {
      "#000000": "Black",
      "#FFFFFF": "White",
      "#FF0000": "Red",
      "#00FF00": "Green",
      "#0000FF": "Blue",
      "#FFFF00": "Yellow",
      "#FF00FF": "Magenta",
      "#00FFFF": "Cyan",
      "#808080": "Gray",
      "#800000": "Maroon",
      "#008000": "Dark Green",
      "#000080": "Navy",
      "#808000": "Olive",
      "#800080": "Purple",
      "#008080": "Teal",
      "#C0C0C0": "Silver",
    };

    return colorNames[hex.toUpperCase()] || hex.toUpperCase();
  };

  const handleColorSelect = (variant: ColorVariant) => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0); // Reset to first image when changing colors

    // Notify parent components
    onColorChange?.(variant);
    onStockCheck?.(variant.stock);
  };

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (!selectedVariant || selectedVariant.images.length === 0) return;

    if (direction === "next") {
      setSelectedImageIndex(
        (prev) => (prev + 1) % selectedVariant.images.length
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === 0 ? selectedVariant.images.length - 1 : prev - 1
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!colorVariants || colorVariants.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No color variants available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="relative">
        {selectedVariant && selectedVariant.images.length > 0 ? (
          <div className="relative group">
            <div
              className="aspect-square w-full max-w-lg mx-auto bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
              onClick={openModal}
            >
              <Image
                src={
                  selectedVariant.images[selectedImageIndex]?.url ||
                  "/placeholder.svg"
                }
                alt={`${productName} in ${getColorName(
                  selectedVariant.colorHex
                )} - Image ${selectedImageIndex + 1}`}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Image Navigation Arrows */}
            {selectedVariant.images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageNavigation("prev")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleImageNavigation("next")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {selectedVariant.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                {selectedImageIndex + 1} / {selectedVariant.images.length}
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-square w-full max-w-lg mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        )}

        {/* Thumbnail Navigation */}
        {selectedVariant && selectedVariant.images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
            {selectedVariant.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all ${
                  index === selectedImageIndex
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Available Colors
          </h3>
          <p className="text-sm text-gray-600">
            Selected: {getColorName(selectedVariant?.colorHex || "")}
            {selectedVariant && (
              <span className="font-mono ml-1">
                ({selectedVariant.colorHex})
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {colorVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleColorSelect(variant)}
              className={`relative aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                selectedVariant?.id === variant.id
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              title={`${getColorName(variant.colorHex)} - ${
                variant.stock
              } in stock`}
            >
              <div
                className="w-full h-full rounded-md flex items-center justify-center text-xs font-medium"
                style={{
                  backgroundColor: variant.colorHex,
                  color: getContrastColor(variant.colorHex),
                }}
              >
                {variant.stock === 0 && (
                  <span className="absolute inset-0 bg-white/80 flex items-center justify-center text-red-600 font-medium text-xs">
                    OUT
                  </span>
                )}
              </div>

              {/* Selected indicator */}
              {selectedVariant?.id === variant.id && (
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}

              {/* Stock indicator */}
              <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs px-1 rounded">
                {variant.stock}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Color Info */}
        {selectedVariant && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: selectedVariant.colorHex }}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {getColorName(selectedVariant.colorHex)}
                  </p>
                  <p className="text-sm text-gray-600 font-mono">
                    {selectedVariant.colorHex}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    selectedVariant.stock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedVariant.stock > 0
                    ? `${selectedVariant.stock} in stock`
                    : "Out of stock"}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedVariant.images.length} image
                  {selectedVariant.images.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Image Modal */}
      {isModalOpen && selectedVariant && selectedVariant.images.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>

            <Image
              src={
                selectedVariant.images[selectedImageIndex]?.url ||
                "/placeholder.svg"
              }
              alt={`${productName} in ${getColorName(
                selectedVariant.colorHex
              )} - Full size`}
              width={1200}
              height={1200}
              className="max-w-full max-h-[calc(100vh-8rem)] object-contain"
            />

            {/* Modal Navigation */}
            {selectedVariant.images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageNavigation("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => handleImageNavigation("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Modal Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded">
              {selectedImageIndex + 1} / {selectedVariant.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
