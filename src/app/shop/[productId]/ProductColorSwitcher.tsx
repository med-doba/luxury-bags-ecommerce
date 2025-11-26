"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Predefined color mapping (same as admin)
const COLOR_OPTIONS = [
  { name: "Black", value: "black", hex: "#000000" },
  { name: "White", value: "white", hex: "#FFFFFF" },
  { name: "Brown", value: "brown", hex: "#8B4513" },
  { name: "Tan", value: "tan", hex: "#D2B48C" },
  { name: "Beige", value: "beige", hex: "#F5F5DC" },
  { name: "Navy", value: "navy", hex: "#000080" },
  { name: "Red", value: "red", hex: "#DC143C" },
  { name: "Pink", value: "pink", hex: "#FFC0CB" },
  { name: "Green", value: "green", hex: "#228B22" },
  { name: "Gray", value: "gray", hex: "#808080" },
  { name: "Camel", value: "camel", hex: "#C19A6B" },
  { name: "Burgundy", value: "burgundy", hex: "#800020" },
];

interface ColorVariantImage {
  id: string;
  url: string;
}

interface ColorVariant {
  id: string;
  color: string;
  stock: number;
  images: ColorVariantImage[];
  sizeVariants?: ColorSizeVariant[];
}

interface ColorSizeVariant {
  id: string;
  size: string;
  stock: number;
  price?: number;
  colorVariantId: string;
}

interface ProductColorSwitcherProps {
  colorVariants: ColorVariant[];
  productName: string;
  mainProductImage: string;
  onColorChange?: (selectedVariant: ColorVariant) => void;
  onStockCheck?: (stock: number) => void;
}

export default function ProductColorSwitcher({
  colorVariants,
  productName,
  mainProductImage,
  onColorChange,
  onStockCheck,
}: ProductColorSwitcherProps) {
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant | null>(
    colorVariants.length > 0 ? colorVariants[0] : null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get color details from predefined options
  const getColorDetails = (colorName: string) => {
    const colorOption = COLOR_OPTIONS.find((c) => c.value === colorName);
    return colorOption || { name: colorName, value: colorName, hex: "#808080" };
  };

  // Get ALL images from ALL color variants for the thumbnail wheel
  const getAllImages = () => {
    const images = [mainProductImage]; // Start with main product image

    // Add all images from all color variants
    colorVariants.forEach((variant) => {
      if (variant.images && variant.images.length > 0) {
        images.push(...variant.images.map((img) => img.url));
      }
    });

    return images;
  };

  // Create mapping of image index to color variant for navigation
  const getImageToColorMapping = () => {
    const mapping: {
      [imageIndex: number]: {
        variant: ColorVariant | null;
        colorStartIndex: number;
      };
    } = {};
    let currentIndex = 0;

    // Main product image (no specific variant)
    mapping[currentIndex] = { variant: null, colorStartIndex: 0 };
    currentIndex++;

    // Map each variant's images
    colorVariants.forEach((variant) => {
      const colorStartIndex = currentIndex;
      if (variant.images && variant.images.length > 0) {
        variant.images.forEach(() => {
          mapping[currentIndex] = { variant, colorStartIndex };
          currentIndex++;
        });
      }
    });

    return mapping;
  };

  const allImages = getAllImages();
  const imageMapping = getImageToColorMapping();

  const handleColorSelect = (variant: ColorVariant) => {
    setSelectedVariant(variant);

    // Find the first image index for this color variant
    let targetImageIndex = 0; // Default to main image

    // Look for the first image of this color variant
    let currentIndex = 1; // Skip main product image at index 0
    for (const colorVariant of colorVariants) {
      if (colorVariant.id === variant.id) {
        // Found the matching variant, set to its first image
        if (colorVariant.images && colorVariant.images.length > 0) {
          targetImageIndex = currentIndex;
        }
        break;
      }
      // Move past this variant's images
      if (colorVariant.images) {
        currentIndex += colorVariant.images.length;
      }
    }

    setSelectedImageIndex(targetImageIndex);

    // Calculate total stock for this color variant
    const totalStock =
      variant.sizeVariants && variant.sizeVariants.length > 0
        ? variant.sizeVariants.reduce((total, sv) => total + sv.stock, 0)
        : variant.stock;

    // Notify parent components
    onColorChange?.(variant);
    onStockCheck?.(totalStock);
  };

  const handleImageNavigation = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (selectedImageIndex + 1) % allImages.length
        : selectedImageIndex === 0
        ? allImages.length - 1
        : selectedImageIndex - 1;

    setSelectedImageIndex(newIndex);

    // Auto-select the color variant for the new image
    const imageInfo = imageMapping[newIndex];
    if (imageInfo?.variant && imageInfo.variant.id !== selectedVariant?.id) {
      const variant = imageInfo.variant;
      const totalStock =
        variant.sizeVariants && variant.sizeVariants.length > 0
          ? variant.sizeVariants.reduce((total, sv) => total + sv.stock, 0)
          : variant.stock;

      setSelectedVariant(variant);
      onColorChange?.(variant);
      onStockCheck?.(totalStock);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);

    // Auto-select the color variant for this image
    const imageInfo = imageMapping[index];
    if (imageInfo?.variant && imageInfo.variant.id !== selectedVariant?.id) {
      const variant = imageInfo.variant;
      const totalStock =
        variant.sizeVariants && variant.sizeVariants.length > 0
          ? variant.sizeVariants.reduce((total, sv) => total + sv.stock, 0)
          : variant.stock;

      setSelectedVariant(variant);
      onColorChange?.(variant);
      onStockCheck?.(totalStock);
    }
  };

  if (!colorVariants || colorVariants.length === 0) {
    // Fallback to original single image display if no color variants
    return {
      imageGallery: (
        <div className="space-y-3 md:space-y-6">
          <div className="aspect-square overflow-hidden rounded-lg md:rounded-xl border border-gray-200 relative group">
            <Image
              src={mainProductImage || "/placeholder.svg"}
              alt={productName}
              className="w-full h-full object-cover product-image-zoom"
              width={800}
              height={800}
              priority
            />
          </div>
        </div>
      ),
      colorSelector: null,
      selectedVariant: null,
    };
  }

  const imageGallery = (
    <div className="space-y-3 md:space-y-6">
      {/* Main Image Display */}
      <div className="aspect-square overflow-hidden rounded-lg md:rounded-xl border border-gray-200 relative group">
        <Image
          src={allImages[selectedImageIndex] || "/placeholder.svg"}
          alt={`${productName} in ${
            getColorDetails(selectedVariant?.color || "").name
          }`}
          className="w-full h-full object-cover product-image-zoom"
          width={800}
          height={800}
          priority
        />

        {/* Navigation Arrows - only show if multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => handleImageNavigation("prev")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button
              onClick={() => handleImageNavigation("next")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md hover:bg-white transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </>
        )}

        {/* Image Counter - only show if multiple images */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
            {selectedImageIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation - show all images with color indicators */}
      {allImages.length > 1 && (
        <div className="relative px-2 md:px-4">
          <div className="overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex gap-2 md:gap-3 min-w-max justify-center">
              {allImages.map((image, index) => {
                const imageInfo = imageMapping[index];
                const isMainImage = index === 0;
                const colorDetails = imageInfo?.variant
                  ? getColorDetails(imageInfo.variant.color)
                  : null;

                return (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className="focus:outline-none relative"
                  >
                    <div
                      className={`aspect-square w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "border-black ring-2 ring-black ring-offset-1"
                          : colorDetails &&
                            selectedVariant?.id === imageInfo?.variant?.id
                          ? "border-gray-400 ring-1 ring-gray-300"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${productName} ${
                          isMainImage
                            ? "main view"
                            : `${colorDetails?.name || "color"} view`
                        } ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Color indicator dot for non-main images */}
                    {!isMainImage && colorDetails && (
                      <div
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: colorDetails.hex }}
                        title={`${colorDetails.name} variant`}
                      />
                    )}

                    {/* Main image indicator */}
                    {isMainImage && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const colorSelector = (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
          Available Colors
        </h3>
        <div className="text-sm text-gray-600 mb-3">
          <p>
            Currently viewing:{" "}
            <span className="font-medium">
              {selectedImageIndex === 0
                ? "Main product image"
                : imageMapping[selectedImageIndex]?.variant
                ? `${
                    getColorDetails(
                      imageMapping[selectedImageIndex].variant.color
                    ).name
                  } variant`
                : "Product image"}
            </span>
          </p>
          {selectedVariant && (
            <p className="mt-1">
              Selected color:{" "}
              <span className="font-medium">
                {getColorDetails(selectedVariant.color).name}
              </span>
              {(() => {
                const totalStock =
                  selectedVariant.sizeVariants &&
                  selectedVariant.sizeVariants.length > 0
                    ? selectedVariant.sizeVariants.reduce(
                        (total, sv) => total + sv.stock,
                        0
                      )
                    : selectedVariant.stock;
                return totalStock > 0 ? (
                  <span className="text-green-600 ml-2">
                    ({totalStock} in stock
                    {selectedVariant.sizeVariants &&
                    selectedVariant.sizeVariants.length > 0
                      ? " total"
                      : ""}
                    )
                  </span>
                ) : (
                  <span className="text-red-600 ml-2">(Out of stock)</span>
                );
              })()}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {colorVariants.map((variant) => {
          const colorDetails = getColorDetails(variant.color);
          const isSelected = selectedVariant?.id === variant.id;

          // Calculate total stock for this color variant
          const totalStock =
            variant.sizeVariants && variant.sizeVariants.length > 0
              ? variant.sizeVariants.reduce((total, sv) => total + sv.stock, 0)
              : variant.stock;

          return (
            <button
              key={variant.id}
              onClick={() => handleColorSelect(variant)}
              disabled={totalStock === 0}
              className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? "border-black ring-2 ring-black ring-offset-1"
                  : "border-gray-300 hover:border-gray-500"
              } ${
                totalStock === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              title={`${colorDetails.name} - ${totalStock} in stock${
                variant.sizeVariants && variant.sizeVariants.length > 0
                  ? " (across all sizes)"
                  : ""
              }`}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-md mb-2"
                style={{ backgroundColor: colorDetails.hex }}
              />
              <span className="text-xs font-medium text-gray-700">
                {colorDetails.name}
              </span>

              {/* Stock indicator */}
              <span className="text-xs text-gray-500 mt-1">
                {totalStock > 0 ? `${totalStock} left` : "Sold out"}
              </span>

              {/* Out of stock overlay */}
              {totalStock === 0 && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-red-600 font-medium text-xs rounded-lg">
                  OUT
                </div>
              )}

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Color Summary */}
      {selectedVariant && (
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-6 h-6 rounded-full border-2 border-gray-300"
                style={{
                  backgroundColor: getColorDetails(selectedVariant.color).hex,
                }}
              />
              <div>
                <p className="font-medium text-gray-900">
                  {getColorDetails(selectedVariant.color).name}
                </p>
                <p className="text-sm text-gray-600">
                  {allImages.length} total image
                  {allImages.length !== 1 ? "s" : ""} •{" "}
                  {selectedVariant.images.length} for this color
                </p>
              </div>
            </div>

            <div className="text-right">
              {(() => {
                const totalStock =
                  selectedVariant.sizeVariants &&
                  selectedVariant.sizeVariants.length > 0
                    ? selectedVariant.sizeVariants.reduce(
                        (total, sv) => total + sv.stock,
                        0
                      )
                    : selectedVariant.stock;
                return (
                  <p
                    className={`text-sm font-medium ${
                      totalStock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {totalStock > 0
                      ? `${totalStock} in stock${
                          selectedVariant.sizeVariants &&
                          selectedVariant.sizeVariants.length > 0
                            ? " total"
                            : ""
                        }`
                      : "Out of stock"}
                  </p>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return {
    imageGallery,
    colorSelector,
    selectedVariant,
  };
}
