"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { X, Upload, Plus, Minus } from "lucide-react";

// Predefined color options
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

// Size options for each color
const SIZE_OPTIONS = [
  { name: "MINI", value: "mini" },
  { name: "SMALL", value: "small" },
  { name: "MEDIUM", value: "medium" },
  { name: "LARGE", value: "large" },
];

export interface ColorSizeVariantData {
  id?: string;
  size: string;
  stock: number;
  price?: number;
}

export interface ColorVariantData {
  id?: string;
  color: string;
  stock: number;
  images: ColorVariantImageData[];
  newImages: File[];
  sizeVariants: ColorSizeVariantData[];
}

export interface ColorVariantImageData {
  id?: string;
  url: string;
  isExisting?: boolean;
}

interface ColorVariantManagerProps {
  colorVariants: ColorVariantData[];
  onChange: (colorVariants: ColorVariantData[]) => void;
  disabled?: boolean;
  basePrice?: number;
}

export default function ColorVariantManager({
  colorVariants,
  onChange,
  disabled = false,
  basePrice = 0,
}: ColorVariantManagerProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>(
    colorVariants.map((cv) => cv.color)
  );

  const fileInputRefs = useRef<{ [color: string]: HTMLInputElement | null }>(
    {}
  );

  const addColorVariant = (color: string) => {
    const newVariant: ColorVariantData = {
      color,
      stock: 0,
      images: [],
      newImages: [],
      sizeVariants: [],
    };

    const updatedVariants = [...colorVariants, newVariant];
    setSelectedColors([...selectedColors, color]);
    onChange(updatedVariants);
  };

  const removeColorVariant = (color: string) => {
    const updatedVariants = colorVariants.filter((cv) => cv.color !== color);
    const updatedColors = selectedColors.filter((c) => c !== color);

    setSelectedColors(updatedColors);
    onChange(updatedVariants);
  };

  const updateColorVariantStock = (color: string, stock: number) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color ? { ...cv, stock } : cv
    );
    onChange(updatedVariants);
  };

  const handleImageUpload = (color: string, files: FileList) => {
    const filesArray = Array.from(files);
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? { ...cv, newImages: [...cv.newImages, ...filesArray] }
        : cv
    );
    onChange(updatedVariants);
  };

  const removeNewImage = (color: string, imageIndex: number) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            newImages: cv.newImages.filter((_, index) => index !== imageIndex),
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const removeExistingImage = (color: string, imageIndex: number) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            images: cv.images.filter((_, index) => index !== imageIndex),
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const getColorHex = (colorName: string) => {
    const color = COLOR_OPTIONS.find((c) => c.value === colorName);
    return color?.hex || "#000000";
  };

  const getColorDisplayName = (colorName: string) => {
    const color = COLOR_OPTIONS.find((c) => c.value === colorName);
    return color?.name || colorName;
  };

  // Size variant management functions
  const addSizeVariant = (color: string, size: string) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            sizeVariants: [
              ...cv.sizeVariants,
              { size, stock: 0, price: undefined },
            ],
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const removeSizeVariant = (color: string, size: string) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            sizeVariants: cv.sizeVariants.filter((sv) => sv.size !== size),
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const updateSizeVariant = (
    color: string,
    size: string,
    updates: Partial<ColorSizeVariantData>
  ) => {
    const updatedVariants = colorVariants.map((cv) =>
      cv.color === color
        ? {
            ...cv,
            sizeVariants: cv.sizeVariants.map((sv) =>
              sv.size === size ? { ...sv, ...updates } : sv
            ),
          }
        : cv
    );
    onChange(updatedVariants);
  };

  const getSizeName = (sizeValue: string) => {
    const sizeOption = SIZE_OPTIONS.find((s) => s.value === sizeValue);
    return sizeOption?.name || sizeValue.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Available Colors
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {COLOR_OPTIONS.map((color) => {
            const isSelected = selectedColors.includes(color.value);

            return (
              <button
                key={color.value}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    removeColorVariant(color.value);
                  } else {
                    addColorVariant(color.value);
                  }
                }}
                disabled={disabled}
                className={`
                  relative flex flex-col items-center p-3 rounded-lg border-2 transition-all
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                  ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 mb-2 ${
                    color.value === "white"
                      ? "border-gray-300"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-medium text-gray-700">
                  {color.name}
                </span>
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    <Plus className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Variants Management */}
      {colorVariants.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">
            Color Variants & Images
          </h3>

          {colorVariants.map((variant) => (
            <div
              key={variant.color}
              className="border border-gray-200 rounded-lg p-4 space-y-4"
            >
              {/* Color Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      variant.color === "white"
                        ? "border-gray-300"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: getColorHex(variant.color) }}
                  />
                  <h4 className="text-md font-medium text-gray-900">
                    Images for {getColorDisplayName(variant.color)}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => removeColorVariant(variant.color)}
                  disabled={disabled}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Size Variants Section */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm font-medium text-gray-900">
                    Size Variants for {getColorDisplayName(variant.color)}
                  </h5>
                </div>

                {/* Size Selection */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {SIZE_OPTIONS.map((size) => {
                    const isSelected = variant.sizeVariants.some(
                      (sv) => sv.size === size.value
                    );
                    return (
                      <button
                        key={size.value}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            removeSizeVariant(variant.color, size.value);
                          } else {
                            addSizeVariant(variant.color, size.value);
                          }
                        }}
                        disabled={disabled}
                        className={`
                          px-3 py-2 text-xs font-medium rounded border transition-colors
                          ${
                            isSelected
                              ? "bg-blue-100 border-blue-300 text-blue-700"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                          }
                          ${
                            disabled
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }
                        `}
                      >
                        {size.name}
                      </button>
                    );
                  })}
                </div>

                {/* Size Variant Details */}
                {variant.sizeVariants.length > 0 && (
                  <div className="space-y-3">
                    <h6 className="text-sm font-medium text-gray-700">
                      Size Details:
                    </h6>
                    <div className="space-y-2">
                      {variant.sizeVariants
                        .sort((a, b) => {
                          const orderA = SIZE_OPTIONS.findIndex(
                            (opt) => opt.value === a.size
                          );
                          const orderB = SIZE_OPTIONS.findIndex(
                            (opt) => opt.value === b.size
                          );
                          return orderA - orderB;
                        })
                        .map((sizeVariant) => (
                          <div
                            key={sizeVariant.size}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded border"
                          >
                            <div className="flex-shrink-0">
                              <span className="text-sm font-medium text-gray-700">
                                {getSizeName(sizeVariant.size)}:
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <label className="text-xs text-gray-600">
                                Stock:
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={sizeVariant.stock}
                                onChange={(e) =>
                                  updateSizeVariant(
                                    variant.color,
                                    sizeVariant.size,
                                    {
                                      stock: parseInt(e.target.value) || 0,
                                    }
                                  )
                                }
                                disabled={disabled}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-xs disabled:opacity-50"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <label className="text-xs text-gray-600">
                                Price Override ($):
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={sizeVariant.price || ""}
                                onChange={(e) =>
                                  updateSizeVariant(
                                    variant.color,
                                    sizeVariant.size,
                                    {
                                      price: e.target.value
                                        ? parseFloat(e.target.value)
                                        : undefined,
                                    }
                                  )
                                }
                                disabled={disabled}
                                placeholder={basePrice.toString()}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-xs disabled:opacity-50"
                              />
                              {!sizeVariant.price && (
                                <span className="text-xs text-gray-400">
                                  (uses base: ${basePrice})
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeSizeVariant(
                                  variant.color,
                                  sizeVariant.size
                                )
                              }
                              disabled={disabled}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {variant.sizeVariants.length === 0 && (
                  <div className="text-center py-3 text-gray-500 text-sm bg-gray-50 rounded border-2 border-dashed">
                    No sizes selected. Click size buttons above to add size
                    variants.
                  </div>
                )}
              </div>

              {/* Image Upload Area */}
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    ref={(el) => {
                      fileInputRefs.current[variant.color] = el;
                    }}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        handleImageUpload(variant.color, e.target.files);
                        e.target.value = "";
                      }
                    }}
                    className="hidden"
                    disabled={disabled}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRefs.current[variant.color]?.click()
                    }
                    disabled={disabled}
                    className="inline-flex flex-col items-center justify-center w-full disabled:opacity-50"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-gray-600 text-sm">
                      Upload images for {getColorDisplayName(variant.color)}
                    </span>
                    <span className="text-gray-400 text-xs mt-1">
                      PNG, JPG, GIF up to 10MB each
                    </span>
                  </button>
                </div>

                {/* Existing Images */}
                {variant.images.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Current Images:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {variant.images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image.url}
                            alt={`${getColorDisplayName(variant.color)} image ${
                              index + 1
                            }`}
                            width={150}
                            height={150}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeExistingImage(variant.color, index)
                            }
                            disabled={disabled}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {variant.newImages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      New Images:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {variant.newImages.map((file, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`New ${getColorDisplayName(
                              variant.color
                            )} image ${index + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(variant.color, index)}
                            disabled={disabled}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {colorVariants.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-sm">
            Select colors above to start adding images for each color variant
          </p>
        </div>
      )}
    </div>
  );
}
