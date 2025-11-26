"use client";

import React, { useState, useEffect, useRef } from "react";

// Size options mapping (same as admin)
const SIZE_OPTIONS = [
  { name: "MINI", value: "mini" },
  { name: "SMALL", value: "small" },
  { name: "MEDIUM", value: "medium" },
  { name: "LARGE", value: "large" },
];

interface SizeVariant {
  id: string;
  size: string;
  stock: number;
  price?: number;
  colorVariantId?: string; // Optional for nested variants
}

interface ProductSizeSelectorProps {
  sizeVariants: SizeVariant[];
  basePrice: number;
  onSizeChange?: (selectedVariant: SizeVariant | null) => void;
  onStockCheck?: (stock: number) => void;
  disabled?: boolean;
  // Sale information
  isOnSale?: boolean;
  salePercentage?: number;
}

export default function ProductSizeSelector({
  sizeVariants,
  basePrice,
  onSizeChange,
  onStockCheck,
  disabled = false,
  isOnSale = false,
  salePercentage = 0,
}: ProductSizeSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<SizeVariant | null>(
    null
  );
  const lastSizeVariantsRef = useRef<SizeVariant[]>([]);

  // Auto-select first available size variant only when sizeVariants change (new color selected)
  useEffect(() => {
    // Check if this is a new set of size variants (different from previous)
    const hasChanged =
      sizeVariants.length !== lastSizeVariantsRef.current.length ||
      sizeVariants.some(
        (variant, index) =>
          !lastSizeVariantsRef.current[index] ||
          variant.id !== lastSizeVariantsRef.current[index].id
      );

    if (hasChanged) {
      lastSizeVariantsRef.current = sizeVariants;

      if (sizeVariants.length > 0) {
        const firstVariant = sizeVariants[0];
        setSelectedVariant(firstVariant);
        onSizeChange?.(firstVariant);
        onStockCheck?.(firstVariant.stock);
      } else {
        setSelectedVariant(null);
        onSizeChange?.(null);
      }
    }
  }, [sizeVariants, onSizeChange, onStockCheck]);

  // Get size display name
  const getSizeName = (sizeValue: string) => {
    const sizeOption = SIZE_OPTIONS.find((s) => s.value === sizeValue);
    return sizeOption?.name || sizeValue.toUpperCase();
  };

  const handleSizeSelect = (variant: SizeVariant) => {
    setSelectedVariant(variant);
    onSizeChange?.(variant);
    onStockCheck?.(variant.stock);
  };

  // Calculate sale price for a given price
  const calculateSalePrice = (originalPrice: number) => {
    if (isOnSale && salePercentage > 0 && salePercentage < 100) {
      return originalPrice * (1 - salePercentage / 100);
    }
    return originalPrice;
  };

  if (!sizeVariants || sizeVariants.length === 0) {
    return null;
  }

  // Sort sizes by predefined order
  const sortedSizes = [...sizeVariants].sort((a, b) => {
    const orderA = SIZE_OPTIONS.findIndex((opt) => opt.value === a.size);
    const orderB = SIZE_OPTIONS.findIndex((opt) => opt.value === b.size);
    return orderA - orderB;
  });

  const selectedOriginalPrice = selectedVariant?.price
    ? Number(selectedVariant.price)
    : basePrice;
  const selectedPrice = calculateSalePrice(selectedOriginalPrice);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2 md:mb-3 text-xs sm:text-sm uppercase tracking-wider">
          Size
        </h3>
        {selectedVariant && (
          <div className="text-sm text-gray-600 mb-3">
            <p>
              Selected:{" "}
              <span className="font-medium">
                {getSizeName(selectedVariant.size)}
              </span>
              {selectedVariant.stock > 0 ? (
                <span className="text-green-600 ml-2">
                  ({selectedVariant.stock} in stock)
                </span>
              ) : (
                <span className="text-red-600 ml-2">(Out of stock)</span>
              )}
            </p>
            {selectedOriginalPrice !== basePrice && (
              <p className="text-sm mt-1">
                Price:{" "}
                <span className="font-medium">
                  {Math.round(selectedPrice)} MAD
                </span>
                {isOnSale && selectedPrice !== selectedOriginalPrice && (
                  <span className="text-gray-500 line-through ml-2">
                    {Math.round(selectedOriginalPrice)} MAD
                  </span>
                )}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sortedSizes.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;
          const originalPrice = variant.price
            ? Number(variant.price)
            : basePrice;
          const displayPrice = calculateSalePrice(originalPrice);
          const priceDiff = originalPrice - basePrice;

          return (
            <button
              key={variant.id}
              onClick={() => handleSizeSelect(variant)}
              disabled={disabled || variant.stock === 0}
              className={`relative p-3 border-2 rounded-lg text-center transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? "border-black bg-black text-white"
                  : variant.stock === 0
                  ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 bg-white text-gray-900 hover:border-gray-500"
              } ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              title={`${getSizeName(variant.size)} - ${
                variant.stock
              } in stock - ${Math.round(displayPrice)} MAD${
                isOnSale ? ` (${salePercentage}% OFF)` : ""
              }`}
            >
              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  {getSizeName(variant.size)}
                </div>

                {/* Price */}
                <div className="text-xs space-y-1">
                  <div className="font-medium">
                    {Math.round(displayPrice)} MAD
                  </div>
                  {isOnSale && originalPrice !== displayPrice && (
                    <div className="line-through text-gray-500">
                      {Math.round(originalPrice)} MAD
                    </div>
                  )}
                </div>

                {/* Stock indicator */}
                <div
                  className={`text-xs ${
                    variant.stock === 0
                      ? "text-red-500"
                      : variant.stock < 5
                      ? isSelected
                        ? "text-yellow-200"
                        : "text-orange-500"
                      : isSelected
                      ? "text-green-200"
                      : "text-green-600"
                  }`}
                >
                  {variant.stock === 0
                    ? "Out of Stock"
                    : variant.stock < 5
                    ? `${variant.stock} left`
                    : "In Stock"}
                </div>
              </div>

              {/* Out of stock overlay */}
              {variant.stock === 0 && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                  <span className="text-red-600 font-medium text-xs">
                    SOLD OUT
                  </span>
                </div>
              )}

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Size Guide Link */}
      <div className="text-center">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-gray-900 underline"
          onClick={() =>
            alert("Size guide functionality would be implemented here")
          }
        >
          Size Guide
        </button>
      </div>

      {/* Selected Size Summary */}
      {selectedVariant && (
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                {getSizeName(selectedVariant.size)} Size
              </p>
              <p className="text-sm text-gray-600">
                {selectedVariant.stock > 0 ? "Available" : "Out of stock"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {Math.round(selectedPrice)} MAD
              </p>
              {isOnSale && selectedPrice !== selectedOriginalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  {Math.round(selectedOriginalPrice)} MAD
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SIZE_OPTIONS };
