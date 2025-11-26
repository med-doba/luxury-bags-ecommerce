"use client";

import React from "react";
import { X, Plus } from "lucide-react";

// Predefined size options
const SIZE_OPTIONS = [
  { name: "MINI", value: "mini" },
  { name: "SMALL", value: "small" },
  { name: "MEDIUM", value: "medium" },
  { name: "LARGE", value: "large" },
];

export interface SizeVariantData {
  id?: string;
  size: string;
  stock: number;
  price?: number; // Optional price override per size
}

interface SizeVariantManagerProps {
  sizeVariants: SizeVariantData[];
  onChange: (variants: SizeVariantData[]) => void;
  disabled?: boolean;
  basePrice?: number; // Base product price for reference
}

export default function SizeVariantManager({
  sizeVariants,
  onChange,
  disabled = false,
  basePrice = 0,
}: SizeVariantManagerProps) {
  const addSizeVariant = () => {
    const unusedSizes = SIZE_OPTIONS.filter(
      (size) => !sizeVariants.some((v) => v.size === size.value)
    );

    if (unusedSizes.length === 0) {
      alert("All size variants have been added!");
      return;
    }

    const newVariant: SizeVariantData = {
      size: unusedSizes[0].value,
      stock: 0,
      price: basePrice, // Default to base price
    };

    onChange([...sizeVariants, newVariant]);
  };

  const removeSizeVariant = (index: number) => {
    const newVariants = sizeVariants.filter((_, i) => i !== index);
    onChange(newVariants);
  };

  const updateSizeVariant = (
    index: number,
    field: keyof SizeVariantData,
    value: string | number
  ) => {
    const newVariants = [...sizeVariants];
    if (field === "stock" || field === "price") {
      newVariants[index][field] = Number(value);
    } else {
      newVariants[index][field] = value as string;
    }
    onChange(newVariants);
  };

  const getSizeName = (sizeValue: string) => {
    const sizeOption = SIZE_OPTIONS.find((s) => s.value === sizeValue);
    return sizeOption?.name || sizeValue.toUpperCase();
  };

  const getAvailableSizes = (currentSize: string) => {
    return SIZE_OPTIONS.filter(
      (size) =>
        size.value === currentSize ||
        !sizeVariants.some((v) => v.size === size.value)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Size Variants</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add different sizes with individual stock and pricing
          </p>
        </div>
        <button
          type="button"
          onClick={addSizeVariant}
          disabled={disabled || sizeVariants.length >= SIZE_OPTIONS.length}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Size
        </button>
      </div>

      {sizeVariants.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="space-y-3">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m-16-4c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                No size variants
              </h3>
              <p className="text-sm text-gray-500">
                Get started by adding your first size variant.
              </p>
            </div>
            <button
              type="button"
              onClick={addSizeVariant}
              disabled={disabled}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Size
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sizeVariants.map((variant, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-2">
                    {getSizeName(variant.size)}
                  </span>
                  Size Variant {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeSizeVariant(index)}
                  disabled={disabled}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                  title="Remove size variant"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <select
                    value={variant.size}
                    onChange={(e) =>
                      updateSizeVariant(index, "size", e.target.value)
                    }
                    disabled={disabled}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  >
                    {getAvailableSizes(variant.size).map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(e) =>
                      updateSizeVariant(
                        index,
                        "stock",
                        parseInt(e.target.value) || 0
                      )
                    }
                    disabled={disabled}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="0"
                  />
                </div>

                {/* Price Override */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Override ($)
                    <span className="text-gray-400 text-xs ml-1">
                      (Optional - Base: ${basePrice})
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.price || ""}
                    onChange={(e) =>
                      updateSizeVariant(
                        index,
                        "price",
                        parseFloat(e.target.value) || basePrice
                      )
                    }
                    disabled={disabled}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder={`${basePrice} (base price)`}
                  />
                </div>
              </div>

              {/* Size Info */}
              <div className="bg-gray-50 rounded-md p-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    <strong>{getSizeName(variant.size)}</strong> - Stock:{" "}
                    <span
                      className={
                        variant.stock > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {variant.stock}
                    </span>
                  </span>
                  <span className="text-gray-900 font-medium">
                    ${variant.price || basePrice}
                    {variant.price !== basePrice && variant.price && (
                      <span className="text-xs text-gray-500 ml-1">
                        (${(variant.price - basePrice).toFixed(2)}{" "}
                        {variant.price > basePrice ? "more" : "less"})
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {sizeVariants.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Size Variants Summary
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {sizeVariants.map((variant, index) => (
              <div key={index} className="text-center">
                <div className="font-medium text-blue-900">
                  {getSizeName(variant.size)}
                </div>
                <div className="text-blue-700">{variant.stock} in stock</div>
                <div className="text-blue-600 text-xs">
                  ${variant.price || basePrice}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">
                Total Sizes: {sizeVariants.length}
              </span>
              <span className="text-blue-700">
                Total Stock: {sizeVariants.reduce((sum, v) => sum + v.stock, 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SIZE_OPTIONS };
